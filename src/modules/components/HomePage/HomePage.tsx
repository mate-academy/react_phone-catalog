/* eslint-disable import/extensions */
/* eslint-disable max-len */
/* eslint-disable prettier/prettier */

//#region IMPORTS
import { useMemo } from 'react';

import { useProducts } from '@/modules/shared/utils/context/ProductsContext';

import { BannerSlider } from './components/BannerSlider';
import { ProductsSlider } from './components/ProductsSlider';
import { CategoriesSection } from './components/CategoriesSection';

import styles from './HomePage.module.scss';
//#endregion

//#region STYLES
const { home, tittle } = styles;
//#endregion STYLES

export const HomePage = () => {
  //#region DATA_FETCHING
  const { products } = useProducts();
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
      <h1 className={tittle}>Welcome to Nice Gadgets store!</h1>
      <BannerSlider />
      <ProductsSlider
        title="Brand new models"
        products={brandNewProducts}
      />
      <CategoriesSection />
      <ProductsSlider
        title="Hot prices"
        products={hotPriceProducts}
        hasDiscount
      />
    </div>
  );
  //#endregion RENDER
};
