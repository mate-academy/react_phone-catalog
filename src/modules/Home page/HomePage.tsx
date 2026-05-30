import React, { useEffect, useState } from 'react';
import { PicturesSlider } from './components/PicturesSlider/PicturesSlider';
import styles from './HomePage.module.scss';
import { Categories } from './components/Categories/Categories';

import { ProductsSlider } from './components/ProductsSlider/ProductsSlider';
import { useTranslation } from 'react-i18next';

export const HomePage = () => {
  const { t } = useTranslation();
  const sliderBanners = [
    './img/slider-banner.svg',
    './img/tablets-banner.png',
    './img/accessories-banner.png',
  ];

  const [products, setProducts] = useState<[] | null>([]);

  const loadProducts = async () => {
    const response = await fetch('./api/products.json');
    const data = await response.json();

    setProducts(data);
  };

  useEffect(() => {
    loadProducts();
  }, []);

  return (
    <div className={styles.container}>
      <h1 style={{ display: 'none' }}>Product Catalog</h1>
      <div className={styles.title}>{t('homepage.welcome')}</div>

      <PicturesSlider
        images={sliderBanners}
        step={1}
        frameSize={1}
        itemWidth={0}
        animationDuration={1000}
        infinite={true}
      />

      <ProductsSlider products={products} title={t('homepage.new_models')} />
      <Categories />
      <ProductsSlider
        products={products}
        hasDiscount={true}
        title={t('homepage.hot_prices')}
      />
    </div>
  );
};
