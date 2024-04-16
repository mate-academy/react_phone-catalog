import { useEffect } from 'react';
import styles from './AccessoriesPage.module.scss';

import { useAppDispatch, useAppSelector } from '../../app/hook';
// import { fetchAccessories } from "../../features/accessoriesSlice";
import { CatalogHeader } from '../../components/CatalogHeader';
import { Loader } from '../../components/Loader';
import { ErrorNoProducts, ErrorSomethingWrong } from '../../components/Errors';
import { ProductsList } from '../../components/ProductsList';
import { fetchProducts } from '../../features/productsSlice';

export const AccessoriesPage = () => {
  const dispatch = useAppDispatch();
  const { accessories, loading, error } = useAppSelector(
    state => state.products,
  );

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <div className={styles.content}>
      <CatalogHeader products={accessories} category="Accessories" />

      {loading && <Loader />}

      {!loading && error && <ErrorSomethingWrong />}

      {!loading && accessories.length === 0 && !error && <ErrorNoProducts />}

      <ProductsList products={accessories} showPagination={true} />
    </div>
  );
};
