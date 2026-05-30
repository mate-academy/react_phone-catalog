import { useParams } from 'react-router-dom';
import styles from './ProductPage.module.scss';
import { Page } from '../../types/pages';
import { NotFoundPage } from '../NotFoundPage';
import { ProductList } from '../../components/ProductList';
import { useAppSelector } from '../../hooks/helperToolkit';
import { Breadcrumbs } from '../../components/Breadcrumbs';

export const ProductPage = () => {
  const { category } = useParams();
  const { deviceList: devices } = useAppSelector(state => state.device);

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
