import Carousel from './Carousel';
import styles from './HomePage.module.scss';
import { useState } from 'react';
import { Product } from '@/types';
import SliderComponent from './SliderComponent';
import productsList from '../../../../public/api/products.json';

const HomePage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>(productsList);
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
              src="/img/categories/smartphones.jpg"
              alt="Mobile Phones"
              className={styles.categoryImage}
            />
            <span className={styles.categoryName}>Mobile phones</span>
          </div>
          <div className={styles.categoryCard}>
            <img
              src="/img/categories/tablets.jpg"
              alt="Tablets"
              className={styles.categoryImage}
            />
            <span className={styles.categoryName}>Tablets</span>
          </div>
          <div className={styles.categoryCard}>
            <img
              src="/img/categories/accessories.jpg"
              alt="Accessories"
              className={styles.categoryImage}
            />
            <span className={styles.categoryName}>Accessories</span>
          </div>
        </div>
      </section>

    </>
  );
};

export default HomePage;
