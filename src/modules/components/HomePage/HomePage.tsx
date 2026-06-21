/* eslint-disable import/extensions */
/* eslint-disable max-len */
/* eslint-disable prettier/prettier */

//#region IMPORTS
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { useProducts } from '@/modules/shared/utils/context/ProductsContext';

import { BannerSlider } from './components/BannerSlider';
import { ProductsSlider } from './components/ProductsSlider';
import { CategoriesSection } from './components/CategoriesSection';

import styles from './HomePage.module.scss';
//#endregion

//#region STYLES
const { home, visuallyHidden, tittle } = styles;
//#endregion STYLES

export const HomePage = () => {
  //#region DATA_FETCHING
  const { products, isLoading } = useProducts();
  const { t } = useTranslation();
  //#endregion DATA_FETCHING

  //#region DATA_TRANSORFATION
  const brandNewProducts = useMemo(() => {
    return [...products].sort((a, b) => b.year - a.year).slice(0, 12);
  }, [products]);

  const hotPriceProducts = useMemo(() => {
    return [...products]
      .filter(product => product.fullPrice > product.price)
      .sort((a, b) => b.fullPrice - b.price - (a.fullPrice - a.price))
      .slice(0, 12);
  }, [products]);
  //#endregion DATA_TRANSORFATION

  //#region RENDER
  return (
    <div className={home}>
      <h1 className={visuallyHidden}>{t('homePage.hidden')}</h1>
      <h2 className={tittle}>{t('homePage.title')}</h2>
      <BannerSlider />
      <ProductsSlider
        title={t('homePage.brandNew')}
        products={brandNewProducts}
        isLoading={isLoading}
      />
      <CategoriesSection />
      <ProductsSlider
        title={t('homePage.hotPrices')}
        products={hotPriceProducts}
        hasDiscount
        isLoading={isLoading}
      />
    </div>
  );
  //#endregion RENDER
};
