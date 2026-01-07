import React, { useEffect, useMemo } from 'react';
import useAllProductsStore from '../../stores/useAllProductsStore';
import { Categories } from './components/Categories';
import BannerSlider from './components/BannerSlider/BannerSlider';
import ProductSlider from '../../components/ProductSlider/ProductSlider';
import styles from './HomePage.module.scss';
import useLanguageStore from '../../stores/useLanguageStore';
import { ProductCardEmpty } from '../../components/ProductCardEmpty';
import classNames from 'classnames';
import { CategoriesEmpty } from './components/CategoriesEmpty';
import { ErrorNotification } from '../../components/ErrorNotification';

const HomePage: React.FC = () => {
  const {
    phones,
    tablets,
    accessories,
    allProducts,
    isLoading,
    error,
    fetchAllProducts,
  } = useAllProductsStore();

  const { t } = useLanguageStore();

  useEffect(() => {
    fetchAllProducts();
  }, [fetchAllProducts]);

  // Обчислення "найновіших" продуктів
  const newestProducts = useMemo(() => {
    if (!allProducts) {
      return [];
    }

    return [...allProducts].sort((a, b) => b.year - a.year).slice(0, 10); // Наприклад, 10 найновіших для слайдера
  }, [allProducts]);

  // Обчислення продуктів "гарячі ціни"
  const hotPriceProducts = useMemo(() => {
    if (!allProducts) {
      return [];
    }

    return [...allProducts]
      .filter(product => product.fullPrice && product.price < product.fullPrice) // Тільки зі знижкою
      .sort((a, b) => {
        const discountA = a.fullPrice! - a.price;
        const discountB = b.fullPrice! - b.price;

        return discountB - discountA; // Сортування від найбільшої знижки до найменшої
      })
      .slice(0, 10); // Наприклад, 10 товарів з найбільшою знижкою для слайдера
  }, [allProducts]);

  if (isLoading) {
    return (
      <div className={styles.loadingHomePage}>
        {/* <p>Завантаження продуктів для головної сторінки...</p> */}
        {/* Title */}
        <div className={classNames(styles.homePage__title, styles.skeleton)} />

        <div className={styles.homePageGrid}>
          {/* BannerSlider */}
          <div
            className={styles.skeleton}
            style={{ width: '100%', height: '405px' }}
          />

          <div>
            {/* ProductSliderTitle */}
            <div
              className={styles.skeleton}
              style={{ width: '200px', height: '41px', marginBottom: '24px' }}
            />
            <div className={styles.loading_grid}>
              <ProductCardEmpty />
              <ProductCardEmpty />
              <ProductCardEmpty />
              <ProductCardEmpty />
            </div>
          </div>

          <CategoriesEmpty />

          <div>
            {/* ProductSliderTitle */}
            <div
              className={styles.skeleton}
              style={{ width: '200px', height: '41px', marginBottom: '24px' }}
            />

            <div className={styles.loading_grid}>
              <ProductCardEmpty />
              <ProductCardEmpty />
              <ProductCardEmpty />
              <ProductCardEmpty />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.container}>
        <ErrorNotification message={error} onRetry={fetchAllProducts} />
      </div>
    );
  }

  return (
    <>
      <div className={styles.homePage}>
        <div className={styles.heroSection}>
          <h1 className={classNames(styles.homePage__title, styles.container)}>
            {t('home_title')}
          </h1>

          <BannerSlider />
        </div>

        <ProductSlider
          products={newestProducts}
          title={t('newest_products_title')}
        />

        <Categories
          totalPhones={phones?.length}
          totalTablets={tablets?.length}
          totalAccessories={accessories?.length}
        />

        <ProductSlider
          products={hotPriceProducts}
          title={t('hot_price_products_title')}
        />
      </div>
    </>
  );
};

export default HomePage;
