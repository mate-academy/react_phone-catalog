import { useAppDispatch, useAppSelector } from '../../app/hook';
import styles from './PhonesPage.module.scss';

import { ProductsList } from '../../components/ProductsList';
import { CatalogHeader } from '../../components/CatalogHeader';
import { useEffect } from 'react';
import { Loader } from '../../components/Loader';
import { ErrorNoProducts, ErrorSomethingWrong } from '../../components/Errors';
import { fetchProducts } from '../../features/productsSlice';

export const PhonesPage = () => {
  const dispatch = useAppDispatch();
  const { phones, loading, error } = useAppSelector(state => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <div className={styles.content}>
      <CatalogHeader products={phones} category="Mobile phones" />
      {loading && <Loader />}

      {!loading && error && <ErrorSomethingWrong />}

      {!loading && phones.length === 0 && !error && <ErrorNoProducts />}

      <ProductsList products={phones} showPagination={true} />
    </div>
  );
};
