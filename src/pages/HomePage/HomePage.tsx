/* eslint-disable react/react-in-jsx-scope */
import styles from './HomePage.module.scss';
import { BrandNewModels } from '../../components/BrandNewModels';
import { HotPrices } from '../../components/HotPrices';
import { PicturesSlider } from '../../components/PicturesSlider';
import { ShopByCategory } from '../../components/ShopByCategory';

export const HomePage = () => {
  return (
    <>
      <h1 className={styles['visually-hidden']}>Product Catalog</h1>
      <div className={styles['home-page']}>
        <PicturesSlider />
        <BrandNewModels />
        <ShopByCategory />
        <HotPrices />
      </div>
    </>
  );
};
