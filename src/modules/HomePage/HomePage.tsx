import { useMemo } from 'react';
import { useProducts } from '../../hooks/useProducts';
import { getBrandNew, getHotPrices } from '../../utils/homeProducts';
import { Container } from '../shared/components/Container';
import { Loader } from '../shared/components/Loader';
import { ProductsSlider } from '../shared/components/ProductsSlider';
import { CategoryLinks } from './components/CategoryLinks';
import { PicturesSlider } from './components/PicturesSlider';
import styles from './HomePage.module.scss';

// keeps the DOM light: sliders show the best offers only
const SLIDER_LIMIT = 20;

export const HomePage = () => {
  const { products, isLoading, hasError, reload } = useProducts();

  const brandNewProducts = useMemo(
    () => getBrandNew(products).slice(0, SLIDER_LIMIT),
    [products],
  );
  const hotPriceProducts = useMemo(
    () => getHotPrices(products).slice(0, SLIDER_LIMIT),
    [products],
  );

  const renderSections = () => {
    if (isLoading) {
      return <Loader />;
    }

    if (hasError) {
      return (
        <div className={styles.message}>
          <p className={styles.messageText}>Something went wrong</p>
          <button type="button" className={styles.button} onClick={reload}>
            Reload
          </button>
        </div>
      );
    }

    return (
      <>
        {brandNewProducts.length > 0 && (
          <ProductsSlider
            title="Brand new models"
            products={brandNewProducts}
          />
        )}

        <CategoryLinks products={products} />

        {hotPriceProducts.length > 0 && (
          <ProductsSlider title="Hot prices" products={hotPriceProducts} />
        )}
      </>
    );
  };

  return (
    <Container className={styles.page}>
      <h1 className="visually-hidden">Product Catalog</h1>
      <h2 className={styles.title}>Welcome to Nice Gadgets store!</h2>

      <div className={styles.slider}>
        <PicturesSlider />
      </div>

      <div className={styles.sections}>{renderSections()}</div>
    </Container>
  );
};
