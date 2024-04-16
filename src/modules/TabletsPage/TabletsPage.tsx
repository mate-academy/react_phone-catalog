import { useEffect } from 'react';
import styles from './Tablets.module.scss';

import { useAppDispatch, useAppSelector } from '../../app/hook';
import { CatalogHeader } from '../../components/CatalogHeader';
import { Loader } from '../../components/Loader';
import { ProductsList } from '../../components/ProductsList';
import { ErrorNoProducts, ErrorSomethingWrong } from '../../components/Errors';
import { fetchProducts } from '../../features/productsSlice';

export const TabletsPage = () => {
  const dispatch = useAppDispatch();
  const { tablets, loading, error } = useAppSelector(state => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <div className={styles.content}>
      <CatalogHeader products={tablets} category="Tablets" />

      {loading && <Loader />}

      {!loading && error && <ErrorSomethingWrong />}

      {!loading && tablets.length === 0 && !error && <ErrorNoProducts />}

      <ProductsList products={tablets} showPagination={true} />
    </div>
  );
};
