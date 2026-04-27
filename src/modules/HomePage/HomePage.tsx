import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../../types';
import { getProducts } from '../../utils/api';
import { PicturesSlider } from '../../components/PicturesSlider';
import { ProductsSlider } from '../../components/ProductsSlider';
import styles from './HomePage.module.scss';

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
        <ProductsSlider title="Hot prices" products={hotPriceProducts} />
      )}

      <section className={styles.shopByCategory}>
        <h2>Shop by category</h2>
        <div className={styles.categories}>
          <Link to="/phones" className={styles.category}>
            <div className={styles.categoryIcon}>
              <i className="fas fa-mobile-alt"></i>
            </div>
            <h3>Phones</h3>
          </Link>
          <Link to="/tablets" className={styles.category}>
            <div className={styles.categoryIcon}>
              <i className="fas fa-tablet-alt"></i>
            </div>
            <h3>Tablets</h3>
          </Link>
          <Link to="/accessories" className={styles.category}>
            <div className={styles.categoryIcon}>
              <i className="fas fa-headphones"></i>
            </div>
            <h3>Accessories</h3>
          </Link>
        </div>
      </section>

      {brandNewProducts.length > 0 && (
        <ProductsSlider title="Brand new" products={brandNewProducts} />
      )}
    </div>
  );
};
