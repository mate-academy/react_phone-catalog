import { useCallback, useEffect, useState } from 'react';
import styles from './ProductsPage.module.scss';
import { Category, ProductWithDetails } from '../../../../_types/products';
import {
  getPreparedProducts,
  getProductWithDetails,
} from '../../../../_services/products';
import Dropdown from '../Dropdown/Dropdown';
import { ProductsList } from '../ProductsList';
import {
  PAGINATION_OPTIONS,
  SORT_OPTIONS,
} from '../../constans/dropdownsOptions';
import { Pagination } from '../Pagination/Pagination';
import { useSearchParams } from 'react-router-dom';
import { Loader } from '../../../shared/components/Loader';
import { getSearchWith } from '../../../shared/utils';
import { Breadcrumbs } from '../../../shared/components/Breadcrumbs';

type Props = {
  category: Category;
};

export const ProductsPage: React.FC<Props> = ({ category }) => {
  type Titles = { [key in Category]: string };
  const TITLES: Titles = {
    phones: 'Mobile phones',
    tablets: 'Tablets page',
    accessories: 'Accessories page',
  };
  const VISIBLE_PAGES_LIMIT = 4;

  const [products, setProducts] = useState<ProductWithDetails[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const sortField = searchParams.get('sort') || 'age';
  const perPage = searchParams.get('perPage') || 'all';
  const page = +(searchParams.get('page') || 1);

  const visibleProduct = useCallback(() => {
    const result = getPreparedProducts(products, sortField);

    if (perPage === 'all') {
      return result;
    }

    const startIndex = (page - 1) * +perPage;
    const endIndex = startIndex + +perPage;

    return result.slice(startIndex, endIndex);
  }, [sortField, products, page, perPage]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const data = await getProductWithDetails(category);

        setProducts(data);
        setError(null);
      } catch (err) {
        setError('Failed to fetch products');
      } finally {
        setLoading(false);
      }
    };

    setTimeout(() => fetchProducts(), 1000);

    return () => {
      setLoading(false);
      setError(null);
    };
  }, [category]);

  useEffect(() => {
    setSearchParams(getSearchWith({ page: null }, searchParams));
  }, [perPage]);

  return (
    <div className={styles.productsPage}>
      <Breadcrumbs category={category} />
      <h1 className={styles.productsPage__title}>{TITLES[category]}</h1>
      <div className={styles.productsPage__quantity}>
        {products.length} models
      </div>
      <section className={styles.productsPage__dropdowns}>
        <Dropdown
          description={'Sort by'}
          options={SORT_OPTIONS}
          selectedOption={sortField}
        />
        <Dropdown
          description={'Items on page'}
          options={PAGINATION_OPTIONS}
          selectedOption={perPage}
        />
      </section>

      <section className={styles['productsPage__products-list']}>
        {products.length === 0 && !loading && (
          <p>There are no {category} yet</p>
        )}
        {loading && !error && <Loader />}
        {!loading && !error && <ProductsList products={visibleProduct()} />}
      </section>

      {perPage !== 'all' && +perPage < products.length && (
        <div className={styles.productsPage__pagination}>
          <Pagination
            itemCount={products.length}
            maxPagesCount={VISIBLE_PAGES_LIMIT}
            perPage={+perPage}
            activePage={page}
          />
        </div>
      )}
    </div>
  );
};
