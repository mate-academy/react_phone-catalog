import { NewModels } from './components/NewModels';
import { PicturesSlider } from './components/Header';
import styles from './HomePage.module.scss';

export const HomePage = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.hidden_title}>Product Catalog</h1>
      <h1 className={styles.container__title}>
        Welcome to Nice Gadgets store!
      </h1>
      <PicturesSlider />
      <NewModels />
    </div>
  );
};
