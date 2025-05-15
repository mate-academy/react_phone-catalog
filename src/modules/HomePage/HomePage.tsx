import React, { useMemo } from 'react';

import { Product, ThemeType } from '../../types';
import { getProducts } from '../../services';
import { useTheme, useLoadData } from '../../hooks';

import {
  InfoMessage,
  ProductsSlider,
  ProductsSliderSkeleton,
} from '../../components';
import { HeroSection, Categories } from './components';

import errorImgLight from '../../assets/loading-error-light.png';
import errorImgDark from '../../assets/loading-error-dark.png';

import styles from './HomePage.module.scss';

export const HomePage: React.FC = () => {
  const { theme } = useTheme();

  const {
    data: products,
    isLoading,
    isError,
    refetch,
  } = useLoadData<Product[]>(getProducts, []);

  const newProducts = useMemo(() => {
    return products?.filter(product => product.year >= 2021) || [];
  }, [products]);

  const hotPriceProducts = useMemo(() => {
    return (
      products?.filter(product => {
        const discount =
          ((product.fullPrice - product.price) * 100) / product.fullPrice;

        return discount >= 10;
      }) || []
    );
  }, [products]);

  const renderErrorMessage = () => (
    <InfoMessage
      title="Oops! Something went wrong while loading the homepage."
      buttonText="Try Again"
      onButtonClick={refetch}
      image={theme === ThemeType.Light ? errorImgLight : errorImgDark}
      className={styles['home-page__message']}
    />
  );

  const renderNewModelsSection = () => {
    return isLoading ? (
      <ProductsSliderSkeleton
        title="Brand new models"
        className={styles['home-page__new-models']}
      />
    ) : (
      <ProductsSlider
        title="Brand new models"
        products={newProducts}
        className={styles['home-page__new-models']}
      />
    );
  };

  const renderHotPricesSection = () => {
    return isLoading ? (
      <ProductsSliderSkeleton
        title="Hot prices"
        className={styles['home-page__hot-prices']}
      />
    ) : (
      <ProductsSlider
        title="Hot prices"
        products={hotPriceProducts}
        className={styles['home-page__hot-prices']}
      />
    );
  };

  const renderCategoriesSection = () => (
    <Categories
      className={styles['home-page__shop-by-category']}
      products={products || []}
      isLoading={isLoading}
    />
  );

  return (
    <main className={styles['home-page']}>
      {isError ? (
        renderErrorMessage()
      ) : (
        <>
          <HeroSection className={styles['home-page__hero']} />
          {renderNewModelsSection()}
          {renderCategoriesSection()}
          {renderHotPricesSection()}
        </>
      )}
    </main>
  );
};
