import { Categories } from '../../components/categories/Categories';
import { ProductSlider } from '../../components/productSlider';
import styles from './HomePage.module.scss';

export const HomePage = () => {
  return (
    <>
      <section className={styles.homepage}>
        <ProductSlider type="Brand new models" />
        <Categories />
        <ProductSlider type="Hot prices" />
      </section>
    </>
  );
};
