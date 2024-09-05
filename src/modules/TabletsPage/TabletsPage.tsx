import { useContext } from 'react';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import { ProductList } from '../../components/ProductList';
import styles from './TabletsPage.module.scss';
import { ProductContext } from '../../context/ProductContext';

const TabletsPage = () => {
  const { tablets } = useContext(ProductContext);

  return (
    <section className={styles.container}>
      <Breadcrumbs />
      <h1 className={styles.title}>Tablets</h1>
      <p className={styles.totalLength}>{`${tablets.length} models`}</p>

      <ProductList product={tablets} />
    </section>
  );
};

export default TabletsPage;
