import { useSearchParams } from 'react-router-dom';
import { Category } from '../../types/Category';
import { Breadcrumbs } from '../shared/components/Breadcrumbs';
import { Dropdown } from '../shared/components/Dropdown';
import { ErrorMessage } from '../shared/components/ErrorMessage';
import { Loader } from '../shared/components/Loader';
import { ProductsList } from '../shared/components/ProductsList';
import {
  CATEGORY_NAMES,
  CATEGORY_TITLES,
} from '../shared/constants/categoryNames';
import { useProducts } from '../shared/hooks/useProducts';
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

interface Props {
  category: Category;
}

export const ProductsPage = ({ category }: Props) => {
  const { products: allProducts, isLoading, hasError, reload } = useProducts();
  const [searchParams, setSearchParams] = useSearchParams();

  const sortParam = searchParams.get('sort');
  const sort = isSortType(sortParam) ? sortParam : DEFAULT_SORT;

  const perPageParam = searchParams.get('perPage');
  const perPage = isPerPage(perPageParam) ? perPageParam : DEFAULT_PER_PAGE;

  const pageParam = Math.floor(Number(searchParams.get('page'))) || 1;

  const products = allProducts.filter(product => product.category === category);

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
      return <ErrorMessage onReload={reload} className={styles.message} />;
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

      <h1 className={styles.title}>{CATEGORY_TITLES[category]}</h1>

      {renderContent()}
    </div>
  );
};
