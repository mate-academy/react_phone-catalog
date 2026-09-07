import { BannerSlider } from './components/BannerSlider';
import { Categories } from './components/Categories';
import { HomeTitle } from './components/HomeTitle';
import { HotPriseSlider } from './components/HotPriseSlider';
import { NewModelSlider } from './components/NewModelSlider';
import styles from './HomePage.module.scss';

export const HomePage = () => {
  return (
    <div className={styles.page}>
      <HomeTitle />

      <BannerSlider />

      <NewModelSlider />

      <Categories />

      <HotPriseSlider />
    </div>
  );
};
