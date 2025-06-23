import { NavLink } from 'react-router-dom';
import styles from './HomePage.module.scss';
import { ProductSlider } from '../ProductsSlider/ProductsSlider';

const categories = [
  {
    name: 'Mobile phones',
    path: '/phones',
    img: '/img/category-mobilephones.png',
  },

  {
    name: 'Tablets',
    path: '/tablets',
    img: '/img/category-tablets.png',
  },

  {
    name: 'Accessories',
    path: '/accessories',
    img: '/img/category-accessories.png',
  },
];

export const HomePage = () => (
  <main className={styles.page}>
    <h1 className={styles.pageTitle}> Welcome to Nice Gadgets store!</h1>
    <section className={styles.pageContent}>
      <div className={styles.sliderWrapper}>
        <ProductSlider />
      </div>
    </section>
    <section className={styles.pageContent}>
      <h2 className={styles.sectionTitle}>Brand new models</h2>
      <div className={styles.sliderWrapper}>
        <ProductSlider />
      </div>
    </section>
    <section className={styles.pageContent}>
      <h2 className={styles.sectionTitle}>Shop by category</h2>
      <div className={styles.categoryCards}>
        {categories.map(category => (
          <NavLink
            className={styles.categoryLink}
            to={category.path}
            key={category.name}
          >
            <img
              src={category.img}
              alt={category.name}
              className={styles.categoryImg}
            />
            <div className={styles.categoryInfo}>
              <h3 className={styles.categoryTitle}>{category.name}</h3>
              <span className={styles.categoryCounter}>xxx models</span>
            </div>
          </NavLink>
        ))}
      </div>
    </section>
    <section className={styles.pageContent}>
      <h2 className={styles.sectionTitle}>Hot prices</h2>
      <div className={styles.sliderWrapper}>
        <ProductSlider />
      </div>
    </section>
  </main>
);
