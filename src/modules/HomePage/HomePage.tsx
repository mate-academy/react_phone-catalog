import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../../types';
import { getProducts } from '../../utils/api';
import { PicturesSlider } from '../../components/PicturesSlider';
import { ProductsSlider } from '../../components/ProductsSlider';
import styles from './HomePage.module.scss';

const imageBase = import.meta.env.BASE_URL || '/';

export const HomePage: React.FC = () => {
  const [hotPriceProducts, setHotPriceProducts] = useState<Product[]>([]);
  const [brandNewProducts, setBrandNewProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const products = await getProducts();

      // Hot prices: products with discount, sorted by discount amount descending
      const hotPrices = products
        .filter(p => p.fullPrice > p.price)
        .sort((a, b) => b.fullPrice - b.price - (a.fullPrice - a.price))
        .slice(0, 8);

      // Brand new: newest products by year
      const brandNew = products.sort((a, b) => b.year - a.year).slice(0, 8);

      setHotPriceProducts(hotPrices);
      setBrandNewProducts(brandNew);
    };

    fetchProducts();
  }, []);

  return (
    <div className={styles.homePage}>
      <h1 className={styles.visuallyHidden}>Product Catalog</h1>

      <PicturesSlider />

      {hotPriceProducts.length > 0 && (
        <ProductsSlider
          title="Welcome to Nice Gadgets store!"
          products={hotPriceProducts}
        />
      )}

      <section className={styles.shopByCategory}>
        <h2>Shop by category</h2>
        <div className={styles.categories}>
          <Link
            to="/phones"
            className={`${styles.category} ${styles.categoryPhones}`}
          >
            <div className={styles.categoryMedia}>
              <img
                src={`${imageBase}img/category-phones.webp`}
                alt="Phones category"
              />
            </div>
            <div className={styles.categoryDetails}>
              <h3>Mobile phones</h3>
              <p>95 models</p>
            </div>
          </Link>
          <Link
            to="/tablets"
            className={`${styles.category} ${styles.categoryTablets}`}
          >
            <div className={styles.categoryMedia}>
              <img
                src={`${imageBase}img/category-tablets.webp`}
                alt="Tablets category"
              />
            </div>
            <div className={styles.categoryDetails}>
              <h3>Tablets</h3>
              <p>24 models</p>
            </div>
          </Link>
          <Link
            to="/accessories"
            className={`${styles.category} ${styles.categoryAccessories}`}
          >
            <div className={styles.categoryMedia}>
              <img
                src={`${imageBase}img/category-accessories.webp`}
                alt="Accessories category"
              />
            </div>
            <div className={styles.categoryDetails}>
              <h3>Accessories</h3>
              <p>100 models</p>
            </div>
          </Link>
        </div>
      </section>

      {brandNewProducts.length > 0 && (
        <ProductsSlider title="Brand new" products={brandNewProducts} />
      )}
    </div>
  );
};
