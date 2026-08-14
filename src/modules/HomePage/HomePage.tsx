import React from 'react';
import { PromoSlider } from './components/Swiper/PromoSlider';
import styles from './HomePage.module.scss';
import { Link } from 'react-router-dom';
import { ProductsSlider } from '../../shared/components/ProductsSlider';
import { useHomePageProducts } from '../../shared/hooks/useHomePageProducts';

export const HomePage = () => {
  const {
    finalBrandNewModels,
    finalHotDiscounts,
    phonesList,
    tabletsList,
    accessoriesList,
  } = useHomePageProducts();

  return (
    <div className={styles.container}>
      <h1 className={styles.visuallyHidden}>Product Catalog</h1>
      <h2 className={styles.title}>Welcome to Nice Gadgets store!</h2>
      <div className={styles.banner}>
        <PromoSlider />
      </div>

      <ProductsSlider
        title="Brand new models"
        products={finalBrandNewModels}
        sliderId="brand"
        hideFullPrice={true}
      />

      <section className={styles.shopByCategory}>
        <h2 className={styles.shopByTitle}>Shop by category</h2>

        <div className={styles.imgLinks}>
          <Link to="/phones" className={styles.linkCard}>
            <img
              src="./img/Phones.png"
              alt="Phones"
              className={styles.cardImg}
            />
            <h3 className={styles.categoryTitle}>Mobile phones</h3>
            <p className={styles.count}>{phonesList.length} models</p>
          </Link>
          <Link to="/tablets" className={styles.linkCard}>
            <img
              src="./img/Tablets.png"
              alt="Tablets"
              className={styles.cardImg}
            />
            <h3 className={styles.categoryTitle}>Tablets</h3>
            <p className={styles.count}>{tabletsList.length} models</p>
          </Link>
          <Link to="/accessories" className={styles.linkCard}>
            <img
              src="./img/Accessories.png"
              alt="Accessories"
              className={styles.cardImg}
            />
            <div className={styles.descripton}>
              <h3 className={styles.categoryTitle}>Accessories</h3>
              <p className={styles.count}>{accessoriesList.length} models</p>
            </div>
          </Link>
        </div>
      </section>

      <ProductsSlider
        title="Hot prices"
        products={finalHotDiscounts}
        sliderId="hot"
      />
    </div>
  );
};
