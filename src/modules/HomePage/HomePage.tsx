import React, { useEffect, useState } from 'react';
import { Product } from '../../types';
import { getData } from '../../utils/api';
import { BannerSlider } from '../shared/components/BannerSlider';
import styles from './HomePage.module.scss';
import { ProductsSlider } from '../shared/components/ProductsSlider';

export const HomePage = () => {
  const [products, setProducts] = useState<Product[]>([]);

  const [, setIsLoading] = useState(false);
  const [, setError] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    getData<Product[]>('products')
      .then(date => setProducts(date))
      .catch(() => {
        setError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const brandNew = [...products].sort((a, b) => b.year - a.year);
  const hotPrice = [...products].sort(
    (a, b) => b.fullPrice - b.price - (a.fullPrice - a.price),
  );

  return (
    <article className={styles.homepage}>
      <p className={styles.title}>Welcome to Nice Gadgets store!</p>
      <div className={styles.banner}>
        <BannerSlider />
      </div>
      <div className={styles.brand_new_slider}>
        <ProductsSlider
          title="Brand new models"
          count={4}
          products={brandNew}
        />
      </div>

      <div className={styles.categories}>
        <p>Shop by category</p>
        <div className="category-1">
          <div className="category-1_img"></div>
          <div className="category-1_title"></div>
        </div>
        <div className="category-2">
          <div className="category-2_img"></div>
          <div className="categor-2_title"></div>
        </div>
        <div className="category-3">
          <div className="category-3_img"></div>
          <div className="category-3_title"></div>
        </div>
      </div>

      <div className="hot-prices-slider">
        <ProductsSlider title="Hot prices" count={4} products={hotPrice} />
      </div>
    </article>
  );
};
