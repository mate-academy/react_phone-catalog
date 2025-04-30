// eslint-disable-next-line max-len
import { useFiltersContext } from 'contexts/FiltersContext';
import { useProductsContext } from 'contexts/ProductsContext';
import { Error } from 'shared/components/layout/Error';
import { Loader } from 'shared/components/layout/Loader';

import { PicturesSlider } from './components/PicturesSlider/PicturesSlider';
import { ProductsCategory } from './components/ProductsCategory/ProductsCategory';
import { ProductsSlider } from './components/ProductsSlider/ProductsSlider';
import styles from './HomePage.module.scss';

export const HomePage: React.FC = () => {
  const { loading, error } = useProductsContext();
  const { newModels, hotModels } = useFiltersContext();

  return (
    <div className={styles.homepage}>
      <div className={styles.section}>
        <h1 className={styles.visuallyHidden}>Product Catalog</h1>
        <h1 className={styles.mainTitle}>Welcome to Nice Gadgets store!</h1>
        <PicturesSlider />
      </div>

      {loading && <Loader />}
      {error && <Error message={error} />}

      {!loading && !error && (
        <>
          <div className={styles.section}>
            <ProductsSlider
              products={newModels}
              showDiscount={false}
              title="Brand new models"
            />
          </div>

          <div className={styles.section}>
            <ProductsCategory />
          </div>

          <div className={styles.section}>
            <ProductsSlider
              products={hotModels}
              showDiscount={true}
              title="Hot prices"
            />
          </div>
        </>
      )}
    </div>
  );
};
