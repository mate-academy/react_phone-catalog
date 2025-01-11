import { PicturesSlider } from '../PicturesSlider/PicturesSlider';
import styles from './HomePage.module.scss';

export const HomePage = () => {
  return (
    <div className={styles.home}>
      <h1 className={styles.home__title}>Product Catalog</h1>
      <PicturesSlider />

      <div
        className="ProductsSlider"
        style={{ height: '200px', width: '100%', background: 'green' }}
      >
        ProductsSlider
      </div>

      <div
        className="Shop by category"
        style={{ height: '200px', width: '100%', background: 'purple' }}
      >
        Shop by category
      </div>

      <div
        className="Hot prices"
        style={{ height: '200px', width: '100%', background: 'purple' }}
      >
        Hot prices
      </div>
    </div>
  );
};
