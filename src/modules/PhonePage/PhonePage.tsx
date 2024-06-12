import { useContext } from 'react';
import styles from './PhonePage.module.scss';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import { ProductContext } from '../../context/ProductContext';
import { ProductList } from '../../components/ProductList';

const PhonePage = () => {
  const { phones } = useContext(ProductContext);

  return (
    <section className={styles.container}>
      <Breadcrumbs />
      <h1 className={styles.title}>Mobile phones</h1>
      <p className={styles.totalLength}>{`${phones.length} models`}</p>

      <ProductList product={phones} />
    </section>
  );
};

export default PhonePage;
