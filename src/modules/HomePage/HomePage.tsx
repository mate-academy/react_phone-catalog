import React, { useEffect, useState } from 'react';
import { Product } from '../../types';
import { getData } from '../../utils/api';
import { BannerSlider } from '../shared/components/BannerSlider';
import styles from './HomePage.module.scss';
import { ProductsSlider } from '../shared/components/ProductsSlider';
import { CategoryCard } from '../shared/components/CategoryCard/CategoryCard';
import { Errors } from '../shared/components/Errors/Errors';

export const HomePage = () => {
  const [products, setProducts] = useState<Product[]>([]);

  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsError(true);
      setIsLoading(false);
    }, 10000);

    getData<Product[]>('products')
      .then(date => {
        setProducts(date);
      })
      .catch(() => {
        setIsError(true);
      })
      .finally(() => {
        clearTimeout(timeout);
        setIsLoading(false);
      });

    return () => clearTimeout(timeout);
  }, []);

  const brandNew = [...products].sort((a, b) => b.year - a.year);
  const hotPrice = [...products].sort(
    (a, b) => b.fullPrice - b.price - (a.fullPrice - a.price),
  );

  const countsPhones = products.filter(p => p.category === 'phones').length;
  const countsTablets = products.filter(t => t.category === 'tablets').length;
  const countsAccessories = products.filter(a => {
    return a.category === 'accessories';
  }).length;

  if (isError) {
    return <Errors type="fetch-error" />;
  }

  return (
    <article className={styles.homepage}>
      <p className={styles.title}>Welcome to Nice Gadgets store!</p>
      <div className={styles.banner}>
        <BannerSlider isLoading={isLoading} />
      </div>
      <div className={styles.brand_new_slider}>
        <ProductsSlider
          title="Brand new models"
          count={4}
          products={brandNew}
          isLoading={isLoading}
        />
      </div>

      <div className={styles.categories}>
        <p className={styles.categories_title}>Shop by category</p>
        <div className={styles.categories_cards}>
          <CategoryCard
            nameCategory="Mobile phones"
            imageCategory="/img/category-phones.webp"
            countModels={countsPhones}
            bgColor="#6D6474"
            linkTo="/phones"
            isLoading={isLoading}
          />
          <CategoryCard
            nameCategory="Tablets"
            imageCategory="/img/category-tablets.webp"
            countModels={countsTablets}
            bgColor="#626262"
            linkTo="/tablets"
            isLoading={isLoading}
          />
          <CategoryCard
            nameCategory="Accessories"
            imageCategory="/img/category-accessories.webp"
            countModels={countsAccessories}
            bgColor="#fcdcff"
            linkTo="/accessories"
            isLoading={isLoading}
          />
        </div>
      </div>

      <div className={styles.hot_prices_slider}>
        <ProductsSlider
          title="Hot prices"
          count={4}
          products={hotPrice}
          isLoading={isLoading}
        />
      </div>
    </article>
  );
};
