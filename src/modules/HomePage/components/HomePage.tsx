import Carousel from './Carousel';
import styles from './HomePage.module.scss';
import { useState } from 'react';
import { Product } from '@/types';
import SliderComponent from './SliderComponent';
import productsList from '../../../../public/api/products.json';

const HomePage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>(productsList);
  const counters = {
    phones: 0,
    tablets: 0,
    accessories: 0,
  };

  for (const item of products) {
    if (counters.hasOwnProperty(item.category)) {
      counters[item.category]++;
    }
  }
  return (
    <>
      <h1 className={styles.PageTitle}>Welcome to Nice Gadgets store!</h1>
      <Carousel />
      <SliderComponent products={products} title="Brand new models" />
      <section className={styles.categorySection}>
        <h2 className={styles.categoryTitle}>Shop by Category</h2>
        <div className={styles.categoryGrid}>
          <div className={styles.categoryCard}>
            <img
              src="/img/1.svg"
              alt="Mobile Phones"
              className={styles.categoryImage}
            />
            <div className={styles.categoryInfo}>
              <span className={styles.categoryName}>Mobile phones</span>
              <span className={styles.categoryCount}>
                {counters.phones} models
              </span>
            </div>
          </div>
          <div className={styles.categoryCard}>
            <img
              src="/img/Phones.svg"
              alt="Tablets"
              className={styles.categoryImage}
            />
            <div className={styles.categoryInfo}>
              <span className={styles.categoryName}>Tablets</span>
              <span className={styles.categoryCount}>
                {counters.tablets} models
              </span>
            </div>
          </div>
          <div className={styles.categoryCard}>
            <img
              src="/img/3.svg"
              alt="Accessories"
              className={styles.categoryImage}
            />
            <div className={styles.categoryInfo}>
              <span className={styles.categoryName}>Accessories</span>
              <span className={styles.categoryCount}>
                {counters.accessories} models
              </span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HomePage;
