import { useSearchParams } from 'react-router-dom';
import { useProducts } from '../../context/ProductsContext';
import { useMemo, useEffect, useState } from 'react';
import {
  filterAndSortProducts,
  itemsForPageOptions,
  sortingOptions,
} from '../../utils';
import Loader from '../../components/Loader/Loader';
import styles from './SearchPage.module.scss';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import CustomSelect from '../../components/CustomSelect/CustomSelect';
import ProductsList from '../../components/ProductsList/ProductsList';
import { Pagination } from '../../components/Pagination';

export const SearchPage = () => {
  const { error, products } = useProducts();
  const [loading, setLoading] = useState(true);

  const [searchParams] = useSearchParams();

  const perPage = searchParams.get('perPage') || 'all';
  const sort = searchParams.get('sort') || 'newest';
  const page = searchParams.get('page') || '1';
  const query = searchParams.get('query') || '';

  useEffect(() => {
    setLoading(true);
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timeout);
  }, [products, query, page, sort, perPage]);

  const { total, items } = useMemo(
    () =>
      filterAndSortProducts(
        products,
        sort,
        perPage === 'all' ? 'all' : +perPage,
        +page,
        query,
      ),
    [products, perPage, sort, page, query],
  );

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <ErrorMessage />;
  }

  if (items.length === 0) {
    return <h2 className={styles.title}>{`No results for ${query}`}</h2>;
  }

  return (
    <div className={styles.products}>
      <h1 className={styles.title}>{`Search results for ${query}`}</h1>

      <p className={styles.products__quantity}>{total} models</p>

      <div className={styles.products__selects}>
        <CustomSelect
          label="Sort by"
          options={sortingOptions}
          paramName="sort"
        />
        <CustomSelect
          label="Items on page"
          options={itemsForPageOptions}
          paramName="perPage"
        />
      </div>

      <ProductsList products={items} />

      {perPage !== 'all' && (
        <Pagination total={total} perPage={+perPage} currentPage={+page} />
      )}
    </div>
  );
};
