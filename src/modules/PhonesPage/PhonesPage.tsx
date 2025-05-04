import React from 'react';
import styles from './PhonesPage.module.scss';
import { Product } from '../../shared/Product';
import { useLocation } from 'react-router-dom';
import { Breadcrumb } from '../../shared/Breadcrumb';
import { useProducts } from '../../contexts/ProductsContext';
import { Loading } from '../../shared/Loading';

export const PhonesPage: React.FC = () => {
  const { products, error, isLoading } = useProducts();
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter(x => x);

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return (
      <main className={styles.phones}>
        <div className={styles.container}>
          <h2>Something went wrong</h2>
          <pre style={{ color: 'red', whiteSpace: 'pre-wrap' }}>
            {JSON.stringify(error, null, 2)}
          </pre>
        </div>
      </main>
    );
  }

  const filteredProducts = products
    .filter(product => product.category === 'phones')
    .reverse();

  return (
    <main>
      <section className={styles.phones}>
        <div className={styles.container}>
          <Breadcrumb pathnames={pathnames} />
          <h1 className={styles.phones__title}>Mobile phones</h1>
          <span className={styles.phones__subtitle}>
            {filteredProducts.length} models
          </span>

          <div className={styles.phones__content}>
            {filteredProducts.map(product => (
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
