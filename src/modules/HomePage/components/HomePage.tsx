import Carousel from './Carousel';
import styles from './HomePage.module.scss';
import { useState } from 'react';
import { Product } from '@/types';
import SliderComponent from './SliderComponent';
import productsList from '../../../../public/api/products.json';
import { Link } from 'react-router-dom';
import PageHeader from '@/modules/shared/components/PageHeader/PageHeader';
const HomePage: React.FC = () => {
  const [products] = useState<Product[]>(productsList);
  const counters = {
    phones: 0,
    tablets: 0,
    accessories: 0,
  };

  for (const item of products) {
    if (item.category in counters) {
      counters[item.category as keyof typeof counters]++;
    }
  }

  const hotProducts = [...products].sort(
    (a, b) => b.fullPrice - b.price - (a.fullPrice - a.price),
  );

  console.log(hotProducts);

  const newProducts = [...products].sort((a, b) => b.year - a.year);

  return (
    <>
      <PageHeader
        title="Welcome to Nice Gadgets store!"
        showBreadCrumbs={false}
        variant="homePage"
      />
      <Carousel />
      <SliderComponent products={newProducts} title="Brand new models" />
      <section className={styles.categorySection}>
        <h2 className={styles.categoryTitle}>Shop by Category</h2>
        <div className={styles.categoryGrid}>
          <Link to="/phones" className={styles.categoryCard}>
            <img
              src="img/phone-category.png"
              alt="Mobile Phones"
              className={styles.categoryImage}
            />
            <div className={styles.categoryInfo}>
              <span className={styles.categoryName}>Mobile phones</span>
              <span className={styles.categoryCount}>
                {counters.phones} models
              </span>
            </div>
          </Link>
          <Link to="/tablets" className={styles.categoryCard}>
            <img
              src="img/tablet-category.png"
              alt="Tablets"
              className={styles.categoryImage}
            />
            <div className={styles.categoryInfo}>
              <span className={styles.categoryName}>Tablets</span>
              <span className={styles.categoryCount}>
                {counters.tablets} models
              </span>
            </div>
          </Link>
          <Link to="/accessories" className={styles.categoryCard}>
            <img
              src="img/accessories-category.jpeg"
              alt="Accessories"
              className={styles.categoryImage}
            />
            <div className={styles.categoryInfo}>
              <span className={styles.categoryName}>Accessories</span>
              <span className={styles.categoryCount}>
                {counters.accessories} models
              </span>
            </div>
          </Link>
        </div>
      </section>
      <SliderComponent products={hotProducts} title="Hot prices" showDiscount />
    </>
  );
};

export default HomePage;
