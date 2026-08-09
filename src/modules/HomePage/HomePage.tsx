/* eslint-disable @typescript-eslint/indent */
/* eslint-disable prettier/prettier */
import { PicturesSlider } from '../../components/PicturesSlider';
import { BrandNewModels } from './components/BrandNewModels';
import { Categories } from './components/Categories';
import { HotPrices } from './components/HotPrices';

import styles from './HomePage.module.scss';

export const HomePage = () => {
  return (
    <>
      <h1 className={styles.pageTitle}>
        Welcome to Nice Gadgets store!
      </h1>

      <PicturesSlider />

      <BrandNewModels />

      <Categories />

      <HotPrices />
    </>
  );
};
