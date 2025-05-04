import React from 'react';
import styles from './AccessoriesPage.module.scss';
import { useLocation } from 'react-router-dom';
import { Breadcrumb } from '../../shared/Breadcrumb';
import { Product } from '../../shared/Product';
import { useProducts } from '../../contexts/ProductsContext';
import { Loading } from '../../shared/Loading';

export const AccessoriesPage: React.FC = () => {
  const { products, error, isLoading } = useProducts();
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter(x => x);

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return (
      <main className={styles.accessories}>
        <div className={styles.container}>
          <h2>Something went wrong</h2>
          <pre style={{ color: 'red', whiteSpace: 'pre-wrap' }}>
            {JSON.stringify(error, null, 2)}
          </pre>
        </div>
      </main>
    );
  }

  const accessories = products
    .filter(product => product.category === 'accessories')
    .reverse();

  return (
    <main>
      <section className={styles.accessories}>
        <div className={styles.container}>
          <Breadcrumb pathnames={pathnames} />
          <h1 className={styles.accessories__title}>Accessories</h1>
          <span className={styles.accessories__subtitle}>
            {accessories.length} models
          </span>

          <div className={styles.accessories__content}>
            {accessories.map(product => (
              <Product
                key={product.id}
                product={product}
                fullPriceActive={true}
              />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};
