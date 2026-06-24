import { useParams, useSearchParams } from 'react-router-dom';
import style from './ProductsPage.module.scss';
import { Select } from '../../components/Select';
import { Card } from '../../components/Card';
import { useMemo } from 'react';
import { Pagination } from '../../components/Pagination';
import { getSearchWith } from '../../utils/search/search';
import { Option } from '../../types/Option';
import { CardSkeleton } from '../../components/Skeletons';
import { ProductCategory } from '../../types/ProductCategory';
import {
  CATEGORY_LABELS,
  PRODUCT_CATEGORIES,
} from '../../constants/categories/categories';
import { sortFunctions, SortOptionValue } from '../../utils/functions/sorting';
import { NotFoundPage } from '../NotFoundPage';
import { useProductsContext } from '../../store/ProductsContext';
import { Breadcrumbs } from '../../components/Breadcrumbs';

const sortOptions: Option[] = [
  { label: 'Newest', value: 'age' },
  { label: 'Oldest', value: 'old' },
  { label: 'Alphabetically', value: 'alphabetically' },
  { label: 'Cheapest', value: 'cheapest' },
  { label: 'Expensive', value: 'expensive' },
];

const perPageOptions: Option[] = [
  { label: 'All', value: 'All' },
  { label: '4', value: '4' },
  { label: '8', value: '8' },
  { label: '16', value: '16' },
];

export const ProductsPage = () => {
  const { category } = useParams<{ category: ProductCategory }>();
  const { products, isLoading, hasError, reload } = useProductsContext();
  const [searchParams, setSearchParams] = useSearchParams();
  const page = +(searchParams.get('page') || '1');
  const perPage = searchParams.get('perPage') || 'All';
  const sort = (searchParams.get('sort') as SortOptionValue) || 'age';

  const sortedProducts = useMemo(() => {
    const allProducts = products.filter(
      product => product.category === category,
    );

    const currentSortFunction = sortFunctions[sort] || sortFunctions.age;

    return [...allProducts].sort(currentSortFunction);
  }, [products, sort, category]);

  const visibleProducts = useMemo(() => {
    if (perPage === 'All') {
      return sortedProducts;
    }

    const itemsPerPageCount = +perPage;
    const startIndex = (page - 1) * itemsPerPageCount;
    const endIndex = startIndex + itemsPerPageCount;

    return sortedProducts.slice(startIndex, endIndex);
  }, [page, perPage, sortedProducts]);

  const isListEmpty = !isLoading && !hasError && sortedProducts.length === 0;
  const shouldShowContent =
    !hasError && (isLoading || sortedProducts.length > 0);

  if (!category || !PRODUCT_CATEGORIES.includes(category)) {
    return <NotFoundPage />;
  }

  const handlePerPageChange = (newValue: string) => {
    const paramsToUpdate = {
      perPage: newValue === 'All' ? null : newValue,
      page: null,
    };

    const newSearch = getSearchWith(paramsToUpdate, searchParams);

    setSearchParams(newSearch);
  };

  const handlePageChange = (newPage: number) => {
    const paramsToUpdate = {
      page: newPage === 1 ? null : newPage.toString(),
    };

    const newSearch = getSearchWith(paramsToUpdate, searchParams);

    setSearchParams(newSearch);
  };

  const handleSortChange = (newValue: string) => {
    const paramsToUpdate = {
      sort: newValue === 'age' ? null : newValue,
      page: null,
    };

    setSearchParams(getSearchWith(paramsToUpdate, searchParams));
  };

  return (
    <div className={style.productsPage}>
      <Breadcrumbs />
      <h1 className={style.productsPage__title}>
        {category ? CATEGORY_LABELS[category] : ''}
      </h1>

      {hasError && (
        <div className={style.productsPage__errorMessage}>
          <p className={style.productsPage__errorMessage__text}>
            Something went wrong
          </p>
          <button
            className={style.productsPage__errorMessage__btn}
            onClick={reload}
          >
            Reload
          </button>
        </div>
      )}

      {isListEmpty && (
        <p className={style.productsPage__errorMessage__text}>
          {`There are no ${category} yet`}
        </p>
      )}

      {shouldShowContent && (
        <>
          <p className={style.productsPage__modelsText}>
            {`${sortedProducts.length} models`}
          </p>

          <div className={style.productsPage__selects}>
            <div className={style.productsPage__selectGroup}>
              <label
                htmlFor="sort"
                className={style.productsPage__selects__text}
              >
                Sort by
              </label>
              <Select
                options={sortOptions}
                width={'187px'}
                value={sort}
                onChange={handleSortChange}
              />
            </div>

            <div className={style.productsPage__selectGroup}>
              <label
                htmlFor="perPage"
                className={style.productsPage__selects__text}
              >
                Items on page
              </label>
              <Select
                options={perPageOptions}
                width={'136px'}
                value={perPage}
                onChange={handlePerPageChange}
              />
            </div>
          </div>

          <div className={style.productsPage__cards}>
            {isLoading
              ? Array.from({ length: 16 }).map((_, index) => (
                  <CardSkeleton key={`skeleton-${index}`} />
                ))
              : visibleProducts.map(product => (
                  <div key={product.id}>
                    <Card product={product} fullPrice={true} />
                  </div>
                ))}
          </div>
        </>
      )}

      {!isLoading && sortedProducts.length > 0 && (
        <Pagination
          totalItems={sortedProducts.length}
          perPage={perPage}
          currentPage={page}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
};
