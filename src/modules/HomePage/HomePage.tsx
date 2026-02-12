import { PictureSlider } from './componets/PictureSlider/PictureSlider';
import styles from './HomePage.module.scss';
import { NewModelsSlider } from './componets/NewModelsSlider/NewModelsSlider';
import { Category } from './componets/Category/Category';
import { HotPrices } from './componets/HotPrices/HotPrices';

export const HomePage = () => {
  return (
    <div className={styles.homepage}>
      <h1 className={styles.hiden}>Product Catalog</h1>

      <PictureSlider />

      <NewModelsSlider />

      <Category />

      <HotPrices />
    </div>
  );
};
