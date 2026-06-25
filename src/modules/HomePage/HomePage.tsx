import { BannerSlider } from './components/BannerSlider/BannerSlider';
import { Categories } from './components/Categories/Categories';
// eslint-disable-next-line max-len
import { ProductsSlider } from '../shared/components/ProductsSlider/ProductsSlider';
import { useProducts } from '../shared/components/hooks/useProducts';
import styles from './HomePage.module.scss';

export const HomePage = () => {
  const { products, loading, error } = useProducts();

  // New Products Sorted Year
  const newModels = [...products].sort((a, b) => b.year - a.year).slice(0, 10);

  // Hot prices — products with biggest sale
  const hotPrices = [...products]
    .sort((a, b) => b.fullPrice - b.price - (a.fullPrice - a.price))
    .slice(0, 10);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Something went wrong...</div>;
  }

  return (
    <div className={styles.homePage}>
      <h1 className={styles.visuallyHidden}>Product Catalog</h1>
      <h2 className={styles.title}>Welcome to Nice Gadgets store!</h2>
      <BannerSlider />
      <ProductsSlider
        title="Brand new models"
        products={newModels}
        showFullPriceOnly={true}
      />
      <Categories />
      <ProductsSlider title="Hot prices" products={hotPrices} />
    </div>
  );
};
