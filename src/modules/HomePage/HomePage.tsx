import { useProducts } from '../shared/hooks/useProducts';
import { ErrorMessage } from '../shared/components/ErrorMessage';
import { Loader } from '../shared/components/Loader';
import { Categories } from './components/Categories';
import { PicturesSlider } from './components/PicturesSlider';
import { ProductsSlider } from '../shared/components/ProductsSlider';
import {
  getBrandNewProducts,
  getHotPriceProducts,
} from './utils/selectProducts';
import styles from './HomePage.module.scss';

export const HomePage = () => {
  const { products, isLoading, hasError, reload } = useProducts();

  const renderContent = () => {
    if (isLoading) {
      return <Loader />;
    }

    if (hasError) {
      return <ErrorMessage onReload={reload} />;
    }

    return (
      <div className={styles.blocks}>
        <ProductsSlider
          title="Brand new models"
          products={getBrandNewProducts(products)}
          showDiscount={false}
        />

        <Categories products={products} />

        <ProductsSlider
          title="Hot prices"
          products={getHotPriceProducts(products)}
        />
      </div>
    );
  };

  return (
    <div className={styles.page}>
      <h1 className={styles.hiddenTitle}>Product Catalog</h1>

      <h2 className={styles.title}>Welcome to Nice Gadgets store!</h2>

      <PicturesSlider className={styles.banner} />

      {renderContent()}
    </div>
  );
};
