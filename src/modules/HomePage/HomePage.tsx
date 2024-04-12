// eslint-disable-next-line max-len
// import { ProductsCategory } from './components/ProductsCategory/ProductsCategory';
// import { ProductsSlider } from './components/ProductsSlider/ProductsSlider';
import { PicturesSlider } from './components/Slider/PicturesSlider';
import styles from './HomePage.module.scss';

export const HomePage = () => {
  return (
    <div className={styles.homepage}>
      <div className={styles.section}>
        <h1 className={styles.mainTitle}>Welcome to Nice Gadgets store!</h1>
        <PicturesSlider />
      </div>

      {/* <div className={styles.section}>
        <h1 className={styles.subTitle}>Brand new models</h1>
        <ProductsSlider />
      </div>

      <div className={styles.section}>
        <h1 className={styles.subTitle}>Shop by category</h1>
        <ProductsCategory />
      </div>

      <div className={styles.section}>
        <h1 className={styles.subTitle}>Hot prices</h1>
        <ProductsSlider />
      </div> */}
    </div>
  );
};
