import { BrandModelsSlider } from '../../components/BrandModelsSlider/BrandModelsSlider';
import { SliderPictures } from '../../components/SliderPictures/SliderPictures';
import { useProducts } from '../../context/ProductsContext';
import styles from './HomePage.module.scss';
import { useMemo } from 'react';
import { ShopByCategory } from '../../components/ShopByCategory';

export const HomePage: React.FC = () => {
  const { products, isLoading, error } = useProducts();

  const brandNewProduct = useMemo(() => {
    return [...products]
      .sort((a, b) => (b.year !== a.year ? b.year - a.year : b.fullPrice - a.fullPrice))
      .map(product => ({ ...product, fullPrice: 0 }));
  }, [products]);

  const hotPricesProduct = useMemo(() => {
    return [...products].sort((a, b) => b.fullPrice - b.price - (a.fullPrice - a.price));
  }, [products]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className={styles.homeContainer}>
      <h2 className={styles.homeTitle}>Welcome to Nice Gadgets store!</h2>

      <div className={styles.sliderContainer}>
        <SliderPictures />
      </div>

      <div className={styles.brandModelsContainer}>
        <BrandModelsSlider title={'Brand new models'} products={brandNewProduct} />
      </div>

      <div className={styles.shopByCategoryContainer}>
        <ShopByCategory products={products} />
      </div>

      <div className={styles.hotPricesContainer}>
        <BrandModelsSlider title={'Hot prices'} products={hotPricesProduct} />
      </div>
    </div>
  );
};
