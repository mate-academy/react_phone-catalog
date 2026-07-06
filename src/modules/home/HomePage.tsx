import { useContext } from 'react';
import styles from './HomePage.module.scss';
import { ProductsStateContext } from '../../shared/context/ProductsContext';
import { Loader } from '../../shared/ui/loader';
import { BannerSlider } from './components/bannerSlider';
import { NewModelsSlider } from './components/newModelsSlider';
import { Categories } from './components/categories';
import { HotPricesSlider } from './components/hotPricesSlider';

export const HomePage = () => {
  const { loading, errorMessage } = useContext(ProductsStateContext);

  return (
    <div className={styles.wrapper}>
      <h2 className={styles.title}>
        <span className={styles.desktopText}>
          Welcome to Nice Gadgets store!
        </span>
        <span className={styles.mobileText}>
          Welcome to Nice
          <br />
          Gadgets store!
        </span>
      </h2>

      {loading && <Loader />}

      {!loading && !errorMessage && (
        <>
          <BannerSlider />
          <NewModelsSlider />
          <Categories />
          <HotPricesSlider />
        </>
      )}
    </div>
  );
};
