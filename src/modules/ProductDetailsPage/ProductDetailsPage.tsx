import { useParams } from 'react-router-dom';

import styles from './ProductDetailsPage.module.scss';

export const ProductDetailsPage = () => {
  const { productId } = useParams();

  return (
    <section className={styles.productDetailsPage}>
      <h1 className={styles.title}>Product details</h1>
      <p>Product ID: {productId}</p>
    </section>
  );
};
