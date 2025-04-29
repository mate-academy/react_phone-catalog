import React, { useEffect, useState } from 'react';
import styles from './PhonesPage.module.scss';
import { ProductType } from '../../types/ProductType';
import { Product } from '../../shared/Product';
import { useLocation } from 'react-router-dom';
import { Breadcrumb } from '../../shared/Breadcrumb';

export const PhonesPage: React.FC = () => {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [productsCount, setProductsCount] = useState<number>(0);

  const location = useLocation();
  const pathnames = location.pathname.split('/').filter(x => x);

  const fetchProducts = async () => {
    try {
      const res = await fetch('api/products.json');
      const data: ProductType[] = await res.json();

      const filteredProducts = data
        .filter(product => product.category === 'phones')
        .reverse();

      setProducts(filteredProducts);
      setProductsCount(filteredProducts.length - 1);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <main>
      <section className={styles.phones}>
        <div className={styles.container}>
          <Breadcrumb pathnames={pathnames} />
          <h1 className={styles.phones__title}>Mobile phones</h1>
          <span className={styles.phones__subtitle}>
            {productsCount} models
          </span>

          <div className={styles.phones__content}>
            {products.map(product => (
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
