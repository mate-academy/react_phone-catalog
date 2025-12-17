import { useState } from 'react';
import { Carousel } from './Carousel';
import { SliderComponent } from './SliderComponent';
import { Product } from '@/types';
import productsList from '../../../../public/api/products.json';
import { Link } from 'react-router-dom';
import PageHeader from '@/modules/shared/components/PageHeader/PageHeader';
import styles from './HomePage.module.scss';
import { ProductsSlider } from './ProductsSlider';
export const HomePage: React.FC = () => {
  const [products] = useState<Product[]>(productsList);
  const counters = {
    phones: 0,
    tablets: 0,
    accessories: 0,
  };

  const getRandomInt = (min: number, max: number): number =>
    Math.floor(Math.random() * (max - min + 1)) + min;
  const getRandomProducts = (products: Product[], min = 10, max = 30) => {
    const safeMax = Math.min(max, products.length);
    const randomCount = getRandomInt(min, safeMax);

    return products.slice(0, randomCount);
  };
  for (const item of products) {
    if (item.category in counters) {
      counters[item.category as keyof typeof counters]++;
    }
  }

  const hotProducts = getRandomProducts(
    [...products].sort(
      (a, b) => b.fullPrice - b.price - (a.fullPrice - a.price),
    ),
  );

  const newProducts = getRandomProducts(
    [...products].sort((a, b) => b.year - a.year),
  );
console.log(newProducts);

  return (
    <>
      <PageHeader
        title="Welcome to Nice Gadgets store!"
        showBreadCrumbs={false}
        variant="homePage"
      />
      <Carousel />
      {/* <SliderComponent products={newProducts} title="Brand new models" /> */}

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
      <ProductsSlider products={products} />
      {/* <SliderComponent products={hotProducts} title="Hot prices" showDiscount /> */}
    </>
  );
};
