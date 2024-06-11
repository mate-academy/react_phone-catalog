import { Categories } from '../../components/categories/Categories';
import { PhotoSlider } from '../../components/photoSlider';
import { ProductSlider } from '../../components/productSlider';
import styles from './HomePage.module.scss';

export const HomePage = () => {
  return (
    <>
      <section className={styles.homepage}>
        <h1 className={styles.homepage__title}>
          Welcome to Nice Gadgets store!
        </h1>
        <PhotoSlider />
        <ProductSlider type="Brand new models" />
        <Categories />
        <ProductSlider type="Hot prices" />
      </section>
    </>
  );
};
