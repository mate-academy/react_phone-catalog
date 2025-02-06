import { Banner } from '../../components/Banner';
import { CategoriesBlock } from '../../components/CategoriesBlock';
import { ProductSlider } from '../../components/ProductSlider';
import styles from './HomePage.module.scss';

export const HomePage = () => {
  return (
    <div className={styles.home} id="page-start">
      <div className={`${styles.home__grid} container`}>
        <h1 className={styles.home__title}>Welcome to Nice Gadgets store!</h1>
      </div>

      <Banner />

      <ProductSlider title={'Brand new models'} />

      <CategoriesBlock />

      <ProductSlider title={'Hot prices'} />
    </div>
  );
};
