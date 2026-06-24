import styles from './HomePage.module.scss';
import { Banner } from '../../../components/Banner';
import { ProductSlider } from '../../../components/ProductSlider';
import { ShopByCategory } from '../../../components/ShopByCategory';
import { useProducts } from '../../../hooks/use-products';
import { Loader } from '../../../components/Loader';
import { SortProducts } from '../../../utils/SortProducts';
import { BaseProduct } from '../../../types';

export const HomePage = () => {
  const { products, loading, error } = useProducts<BaseProduct>();

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <div>{error}</div>;
  }

  const newModels = SortProducts([...products], 'newest');
  const hotPrices = SortProducts([...products], 'discount');

  return (
    <>
      <h1 className={styles.heroTitle}>Welcome to Nice Gadgets store!</h1>
      <Banner />
      <ProductSlider
        variant="newModels"
        title="Brand new models"
        products={newModels}
      />
      <ShopByCategory />
      <ProductSlider title="Hot prices" products={hotPrices} />
    </>
  );
};
