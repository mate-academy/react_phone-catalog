/* eslint-disable react/react-in-jsx-scope */
import styles from './HomePage.module.scss';
import { BrandNewModels } from '../../components/BrandNewModels';
import { HotPrices } from '../../components/HotPrices';
import { PicturesSlider } from '../../components/PicturesSlider';
import { ShopByCategory } from '../../components/ShopByCategory';

export const HomePage = () => {
  return (
    <>
      <div className={styles['home-slider']}>
        <PicturesSlider />
      </div>
      <div className={styles['home-page']}>
        <BrandNewModels />
        <ShopByCategory />
        <HotPrices />
      </div>
    </>
  );
};
