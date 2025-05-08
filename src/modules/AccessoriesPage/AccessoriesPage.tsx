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
      <main>
        <div className={'container'}>
          <h1 style={{ color: 'red', textAlign: 'center', marginTop: '32px' }}>
            Something went wrong
          </h1>
          <img src="img/error.png" alt="Error" />
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
