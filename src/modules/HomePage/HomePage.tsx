import React, { useMemo } from 'react';
import styles from './HomePage.module.scss';
import { useAppSelector } from '../../hooks/hooks';
import { useTranslation } from 'react-i18next';
import { getHotPricedProducts } from '../../helpers/getHotPricedProducts';
import { getNewestExpensiveProducts } from '../../helpers/getNewestExpensiveProducts';
import { Typography } from '../shared/atoms/Typography';
import { ProductSlider } from '../shared/organisms/ProductSlider';
import { MainSlider } from './components/organisms/MainSlider';
import { HomePageCategories } from './components/organisms/HomePageCategories';

export const HomePage: React.FC = () => {
  const { products, loading } = useAppSelector(state => state.products);
  const { t } = useTranslation();

  const hotPrices = useMemo(
    () => (loading ? [] : getHotPricedProducts(products, 10)),
    [loading, products],
  );

  const brandNew = useMemo(
    () => (loading ? [] : getNewestExpensiveProducts(products, 10)),
    [loading, products],
  );

  return (
    <div className={styles.page}>
      <div className={styles.page__content}>
        <Typography variant="h1" tag="h1" className={styles.page__title}>
          {t('home.title')}
        </Typography>

        <div className={styles.home_content}>
          <div className={styles.home_content__item}>
            <MainSlider />
          </div>
          <div className={styles.home_content__item}>
            <ProductSlider
              title={t('slider.title.products.new')}
              productsList={brandNew}
              id={1}
              className={styles.carousel_products}
              infinite
            />
          </div>
          <div className={styles.home_content__item}>
            <HomePageCategories />
          </div>
          <div className={styles.home_content__item}>
            <ProductSlider
              title={t('slider.title.products.hot')}
              productsList={hotPrices}
              id={2}
              className={styles.carousel_products}
              infinite
            />
          </div>
        </div>
      </div>
    </div>
  );
};
