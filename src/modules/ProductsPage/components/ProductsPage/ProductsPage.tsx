import { useEffect, useMemo } from 'react';
import styles from './ProductsPage.module.scss';
import { Category } from '../../../../_types/products';
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
import { getSearchWith } from '../../../../_utils/getSearchWith';
import { Breadcrumbs } from '../../../shared/components/Breadcrumbs';
import { ButtonPrimary } from '../../../shared/components/ButtonPrimary';
import { useProducts } from '../../../../_hooks/useProducts';
import { Loader } from '../../../shared/components/Loader';

type Props = {
  category: Category;
};

const VISIBLE_PAGES_LIMIT = 4;

export const ProductsPage: React.FC<Props> = ({ category }) => {
  const TITLES: Record<Category, string> = {
    phones: 'Mobile phones',
    tablets: 'Tablets page',
    accessories: 'Accessories page',
  };

  const {
    data: products,
    loading,
    error,
  } = useProducts(
    () => getProductWithDetails(category),
    'Something went wrong.',
    [category],
  );
  const [searchParams, setSearchParams] = useSearchParams();

  const sortField = searchParams.get('sort') || 'age';
  const perPage = searchParams.get('perPage') || 'all';
  const page = +(searchParams.get('page') || 1);
  const query = searchParams.get('query') || '';

  const filteredProducts = useMemo(() => {
    if (!products) {
      return [];
    }

    let sortedProducts = getPreparedProducts(products, sortField);

    if (query) {
      sortedProducts = sortedProducts.filter(product =>
        product.name.toLowerCase().includes(query),
      );
    }

    return sortedProducts;
  }, [query, sortField, products]);

  const visibleProduct = useMemo(() => {
    if (!filteredProducts) {
      return [];
    }

    if (perPage === 'all') {
      return filteredProducts;
    }

    const startIndex = (page - 1) * +perPage;
    const endIndex = startIndex + +perPage;

    return filteredProducts.slice(startIndex, endIndex);
  }, [filteredProducts, page, perPage]);

  useEffect(() => {
    setSearchParams(getSearchWith({ page: null }, searchParams));
  }, [perPage, sortField, query]);

  return (
    <div className={styles.productsPage}>
      <Breadcrumbs category={category} />
      <h1 className={styles.productsPage__title}>{TITLES[category]}</h1>
      {error ? (
        <div className={styles.productsPage__error}>
          <p>{error}</p>
          <ButtonPrimary
            title="Reload"
            onClick={() => window.location.reload()}
          />
        </div>
      ) : loading ? (
        <Loader />
      ) : products ? (
        <>
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
          <section
            className={styles['productsPage__products-list']}
            id="product-list"
          >
            {products.length === 0 && !loading && !error && (
              <p>There are no {category} yet</p>
            )}
            {filteredProducts.length === 0 && !loading && !error && (
              <p>There are no {category} matching the query</p>
            )}

            {!loading && !error && <ProductsList products={visibleProduct} />}
          </section>
          {perPage !== 'all' && +perPage < products.length && (
            <div className={styles.productsPage__pagination}>
              <Pagination
                itemCount={filteredProducts.length}
                maxPagesCount={VISIBLE_PAGES_LIMIT}
                perPage={+perPage}
                activePage={page}
              />
            </div>
          )}
        </>
      ) : null}
    </div>
  );
};
