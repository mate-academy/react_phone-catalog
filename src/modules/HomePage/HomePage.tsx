// src/modules/HomePage/HomePage.tsx
import React, { useEffect, useState } from 'react';
import styles from './HomePage.module.scss';
import { Link } from 'react-router-dom';
import PictureSlider from './components/PictureSlider';
import ProductsSlider from './components/ProductsSlider';
import { Product } from '../../types/Product';
import './HomePage.module.scss';

export const HomePage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    // Dummy product data – replace with your actual API calls as needed
    const dummyProducts: Partial<Product>[] = [
      {
        id: '1',
        name: 'iPhone 13',
        fullPrice: 999,
        price: 899,
        year: 2022,
        image: ['/img/phones/apple-iphone-13-pro-max/gold/00.webp'],
      },
      {
        id: '2',
        name: 'Samsung Galaxy S21',
        fullPrice: 799,
        price: 749,
        year: 2021,
        image: ['/img/phones/apple-iphone-14/midnight/00.webp'],
      },
      {
        id: '3',
        name: 'Google Pixel 6',
        fullPrice: 599,
        price: 549,
        year: 2022,
        image: ['/img/phones/apple-iphone-14-pro/gold/00.webp'],
      },
    ];

    setProducts(dummyProducts as Product[]);
  }, []);

  const sliderImages = [
    '/img/banner-accessories.png',
    '/img/banner-phones.png',
    '/img/banner-tablets.png',
  ];

  // Hot Prices block: Filter products with a discount and sort by absolute discount descending.
  const hotPriceProducts = products
    .filter(product => product.fullPrice > product.price)
    .sort((a, b) => b.fullPrice - b.price - (a.fullPrice - a.price));

  // Brand New block: Sort products by year descending (most recent first).
  const brandNewProducts = [...products].sort((a, b) => b.year - a.year);

  return (
    <div className={styles.homePage}>
      {/* Visually hidden h1 for accessibility */}
      <h1 className={styles.visuallyHidden}>Category</h1>

      {/* Picture Slider */}
      <div className={styles.container}>
        <section className={styles.slider}>
          <h2>Featured Products</h2>
          <div className={styles.sliderDescription}>
            <h2>Discover the latest and greatest gadgets!</h2>
          </div>
          <PictureSlider images={sliderImages} />
        </section>
      </div>

      {/* Brand New Block */}
      <div className={styles.container}>
        <section className={styles.brandNew}>
          <h2>Brand new models</h2>
          <ProductsSlider products={brandNewProducts} />
        </section>
      </div>

      <div className={styles.container}>
        <section className={styles.shopByCategory}>
          <h2>Shop By Category</h2>
          <div className={styles.categories}>
            <div className={styles.categoryItem}>
              <img src="/img/1.png" alt="Phones" />
              <Link to="/phones">Phones</Link>
              <p className={styles.descr}>95 models</p>
            </div>
            <div className={styles.categoryItem}>
              <img src="/img/2.png" alt="Tablets" />
              <Link to="/tablets">Tablets</Link>
              <p>25 models</p>
            </div>
            <div className={styles.categoryItem}>
              <img src="/img/3.png" alt="Accessories" />
              <Link to="/accessories">Accessories</Link>
              <p>100 models</p>
            </div>
          </div>
        </section>
      </div>

      {/* Hot Prices Block */}
      <div className={styles.container}>
        <section className={styles.hotPrices}>
          <h2>Hot Prices</h2>
          <ProductsSlider products={hotPriceProducts} />
        </section>
      </div>
    </div>
  );
};

export default HomePage;
