import { PicturesSlider } from './components/PicturesSlider';
import { ProductsNewest } from './components/ProductsNewest/ProductsNewest';
import { CategoryList } from './components/CategoryList/CategoryList';
import { ProductsHotPrices } from './components/ProductsHotPrices';
import { useProducts } from '../../shared/context/ProductsContext';
import styles from './HomePage.module.scss';

export const HomePage: React.FC = () => {
  const { products } = useProducts();

  return (
    <div className={styles['home-page']}>
      <div className={`${styles['home-page__container']} container`}>
        <PicturesSlider />
        <ProductsNewest products={products} />
        <CategoryList />
        <ProductsHotPrices products={products} />
      </div>
    </div>
  );
};
