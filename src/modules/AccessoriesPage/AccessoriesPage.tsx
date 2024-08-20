import { useContext } from 'react';
import styles from './AccessoriesPage.module.scss';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import { ProductContext } from '../../context/ProductContext';
import { ProductList } from '../../components/ProductList';

const AccessoriesPage = () => {
  const { accessories } = useContext(ProductContext);

  return (
    <section className={styles.container}>
      <Breadcrumbs />
      <h1 className={styles.title}>Accessories</h1>
      <p className={styles.totalLength}>{`${accessories.length} models`}</p>

      <ProductList product={accessories} />
    </section>
  );
};

export default AccessoriesPage;
