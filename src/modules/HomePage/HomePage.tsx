import { BrandNewModel } from '../../components/BrandNewModels';
import { Category } from '../../components/Category';
import { HotPrices } from '../../components/HotPrices';
import { PictureSlider } from '../../components/PictureSlider';
import styles from './HomePage.module.scss';

export const HomePage = () => {
  return (
    <div className={styles.homePage__container}>
      <h1 className={styles.title}>Welcome to Nice Gadgets store!</h1>
      <PictureSlider />
      <BrandNewModel />
      <Category />
      <HotPrices />
    </div>
  );
};
