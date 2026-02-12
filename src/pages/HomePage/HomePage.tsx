import styles from './HomePage.module.scss';
import { PictureSlider } from '../../components/PictureSlider';
import { BrandNewModels } from '../../components/BrandNewModels';
import { Categories } from '../../components/Categories';
import { HotPrices } from '../../components/HotPrices';

export const HomePage = () => {
  return (
    <div className={styles['home-page']}>
      <h2 className={styles['home-page__title']}>
        <span className={styles['home-page__title--part']}>
          Welcome to Nice
        </span>
        Gadgets store!
      </h2>

      <div className={styles['home-page__picture-slider']}>
        <PictureSlider />
      </div>

      <div className={styles['home-page__brands-new-models']}>
        <BrandNewModels />
      </div>

      <div className={styles['home-page__categories']}>
        <Categories />
      </div>

      <div className={styles['home-page__hot-prices']}>
        <HotPrices />
      </div>
    </div>
  );
};
