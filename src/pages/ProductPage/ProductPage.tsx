import 'react-loading-skeleton/dist/skeleton.css';
import { useParams } from 'react-router-dom';
import styles from './ProductPage.module.scss';
import { Page } from '../../types/pages';
import { NotFoundPage } from '../NotFoundPage';
import { ProductList } from '../../components/ProductList';
import { useAppDispatch, useAppSelector } from '../../hooks/helperToolkit';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import { useEffect } from 'react';
import { setGlobalLoading } from '../../slices/uiSlice';

export const ProductPage = () => {
  const dispatch = useAppDispatch();

  const { category } = useParams();
  const { deviceList: devices, fetchDevicesLoading } = useAppSelector(
    state => state.device,
  );

  useEffect(() => {
    if (!fetchDevicesLoading) {
      dispatch(setGlobalLoading(false));
    }
  }, [fetchDevicesLoading]);

  const isValidPage = Object.values(Page).includes(category as Page);

  const title =
    category === Page.Phones
      ? 'Mobile phones'
      : category === Page.Tablets
        ? 'Tablets'
        : 'Accessories';

  if (!isValidPage) {
    return <NotFoundPage />;
  }

  return (
    <>
      <Breadcrumbs />

      <section className={styles.productsSection}>
        <div>
          <h1 className={styles.title}>{title}</h1>

          <p className={styles.amountModels}>{devices.length} models</p>
        </div>

        <ProductList title={title} />
      </section>
    </>
  );
};
