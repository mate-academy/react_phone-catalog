import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getProductsByCategory } from '../../api/products';
import { Category } from '../../types/Category';
import { Product } from '../../types/Product';
import { Dropdown } from '../shared/components/Dropdown';
import { Loader } from '../shared/components/Loader';
import { ProductsList } from '../shared/components/ProductsList';
import { Breadcrumbs } from '../shared/components/Breadcrumbs';
import { CATEGORY_NAMES } from '../shared/constants/categoryNames';
import { getSearchWith } from '../shared/utils/getSearchWith';
import { Pagination } from './components/Pagination';
import {
  DEFAULT_PER_PAGE,
  PER_PAGE_OPTIONS,
  isPerPage,
  paginate,
} from './utils/pagination';
import {
  DEFAULT_SORT,
  SORT_OPTIONS,
  isSortType,
  sortProducts,
} from './utils/sorting';
import styles from './ProductsPage.module.scss';

const TITLES: Record<Category, string> = {
  phones: 'Mobile phones',
  tablets: 'Tablets',
  accessories: 'Accessories',
};

interface Props {
  category: Category;
}

export const ProductsPage = ({ category }: Props) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [reloadCount, setReloadCount] = useState(0);
  const [searchParams, setSearchParams] = useSearchParams();

  const sortParam = searchParams.get('sort');
  const sort = isSortType(sortParam) ? sortParam : DEFAULT_SORT;

  const perPageParam = searchParams.get('perPage');
  const perPage = isPerPage(perPageParam) ? perPageParam : DEFAULT_PER_PAGE;

  const pageParam = Math.floor(Number(searchParams.get('page'))) || 1;

  useEffect(() => {
    let isCurrent = true;

    setIsLoading(true);
    setHasError(false);

    getProductsByCategory(category)
      .then(data => {
        if (isCurrent) {
          setProducts(data);
        }
      })
      .catch(() => {
        if (isCurrent) {
          setHasError(true);
        }
      })
      .finally(() => {
        if (isCurrent) {
          setIsLoading(false);
        }
      });

    return () => {
      isCurrent = false;
    };
  }, [category, reloadCount]);

  const reload = () => setReloadCount(count => count + 1);

  const handleSortChange = (value: string) => {
    setSearchParams(getSearchWith(searchParams, { sort: value, page: null }));
  };

  const handlePerPageChange = (value: string) => {
    setSearchParams(
      getSearchWith(searchParams, {
        perPage: value === DEFAULT_PER_PAGE ? null : value,
        page: null,
      }),
    );
  };

  const handlePageChange = (page: number) => {
    setSearchParams(
      getSearchWith(searchParams, { page: page === 1 ? null : String(page) }),
    );
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderContent = () => {
    if (isLoading) {
      return <Loader />;
    }

    if (hasError) {
      return (
        <div className={styles.message}>
          <p>Something went wrong</p>

          <button type="button" className={styles.reload} onClick={reload}>
            Reload
          </button>
        </div>
      );
    }

    if (products.length === 0) {
      return <p className={styles.message}>There are no {category} yet</p>;
    }

    const { pageItems, currentPage, totalPages } = paginate(
      sortProducts(products, sort),
      perPage,
      pageParam,
    );

    return (
      <>
        <p className={styles.count}>{products.length} models</p>

        <div className={styles.controls}>
          <Dropdown
            label="Sort by"
            value={sort}
            options={SORT_OPTIONS}
            onChange={handleSortChange}
            className={styles.sortDropdown}
          />

          <Dropdown
            label="Items on page"
            value={perPage}
            options={PER_PAGE_OPTIONS}
            onChange={handlePerPageChange}
            className={styles.perPageDropdown}
          />
        </div>

        <ProductsList products={pageItems} />

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </>
    );
  };

  return (
    <div className={styles.page}>
      <Breadcrumbs
        items={[{ label: CATEGORY_NAMES[category] }]}
        className={styles.breadcrumbs}
      />

      <h1 className={styles.title}>{TITLES[category]}</h1>

      {renderContent()}
    </div>
  );
};
