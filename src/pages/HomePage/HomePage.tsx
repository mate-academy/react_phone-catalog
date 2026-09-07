import { useContext } from 'react';
import { Banner } from '../../components/Banner';
import { CategoriesBlock } from '../../components/CategoriesBlock';
import { ProductSlider } from '../../components/ProductSlider';
import styles from './HomePage.module.scss';
import { AppContext } from '../../context/AppContext';
import { ErrorComponent } from '../../components/ErrorComponent';

export const HomePage = () => {
  const { newModels, hotPrices, error } = useContext(AppContext)!;

  if (error) {
    return <ErrorComponent />;
  }

  return (
    <div className={styles.home} id="page-start">
      <h1 className="hidden">Product Catalog</h1>

      <div className={`${styles.home__grid} container`}>
        <h2 className={styles.home__title}>Welcome to Nice Gadgets store!</h2>
      </div>

      <Banner />

      <div className="container">
        <ProductSlider title={'Brand new models'} productsList={newModels} />

        <CategoriesBlock />

        <ProductSlider title={'Hot prices'} productsList={hotPrices} />
      </div>
    </div>
  );
};
