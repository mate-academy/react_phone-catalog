import React from 'react';
import styles from './TabletsPage.module.scss';
import { useLocation } from 'react-router-dom';
import { Breadcrumb } from '../../shared/Breadcrumb';
import { Product } from '../../shared/Product';
import { ProductType } from '../../types/ProductType';
import { useProducts } from '../../contexts/ProductsContext';
import { Loading } from '../../shared/Loading';

export const TabletsPage: React.FC = () => {
  const { products, error, isLoading } = useProducts();
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter(x => x);

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return (
      <main className={styles.tablets}>
        <div className={styles.container}>
          <h2>Something went wrong</h2>
          <pre style={{ color: 'red', whiteSpace: 'pre-wrap' }}>
            {JSON.stringify(error, null, 2)}
          </pre>
        </div>
      </main>
    );
  }

  const tablets = products.filter(
    (product: ProductType) => product.category === 'tablets',
  );

  return (
    <main>
      <section className={styles.tablets}>
        <div className={styles.container}>
          <Breadcrumb pathnames={pathnames} />
          <h1 className={styles.tablets__title}>Tablets</h1>
          <span className={styles.tablets__subtitle}>
            {tablets.length} models
          </span>

          <div className={styles.tablets__content}>
            {tablets.map(product => (
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
