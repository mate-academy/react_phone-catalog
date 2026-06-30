import { useState, useEffect } from 'react';
import styles from './HomePage.module.scss';
import { Banner } from './components/Banner';
import { Categories } from './components/Categories';
import { ProductsSlider } from './components/ProductsSlider';
import { Product } from '../../types/Product';

export const HomePage = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch('/api/products.json')
      .then(response => response.json())
      .then(data => {
        setProducts(data);
      })
      .catch(() => {});
  }, []);

  const brandNewProducts = [...products]
    .sort((a, b) => b.year - a.year)
    .slice(0, 10);

  const hotPricesProducts = [...products]
    .filter(product => product.fullPrice > product.price)
    .sort((a, b) => {
      const discountA = a.fullPrice - a.price;
      const discountB = b.fullPrice - b.price;

      return discountB - discountA;
    })
    .slice(0, 10);

  return (
    <div className={styles.home}>
      <h1 className="visually-hidden">Product Catalog</h1>

      <h2 className={styles.home__title}>
        <span className={styles.home__titleLine}>Welcome to Nice</span>
        <span className={styles.home__titleLine}>Gadgets store!</span>
      </h2>

      <section className={styles.home__section}>
        <Banner />
      </section>

      <section className={styles.home__section}>
        <ProductsSlider
          title="Brand new models"
          products={brandNewProducts}
          hideDiscount={true}
        />
      </section>

      <section className={styles.home__section}>
        <Categories />
      </section>

      <section className={styles.home__section}>
        <ProductsSlider title="Hot prices" products={hotPricesProducts} />
      </section>
    </div>
  );
};
