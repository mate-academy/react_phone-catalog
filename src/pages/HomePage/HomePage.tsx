import styles from './HomePage.module.scss';
import { Hero } from './components/Hero';
import { ProductsSlider } from './components/ProductsSlider';
import { getNewModels } from '../../utils/getNewModels';
import { sortById } from '../../utils/sortById';
import { useProducts } from '../../hooks/useProducts';
import { getUniqueProducts } from '../../utils/getUniqueProducts';
import { CategoryShop } from './components/CategoryShop';
import { getTheHotestPrices } from '../../utils/getTheHotestPrices';

export const HomePage = () => {
  const { products } = useProducts();
  const newModels = sortById(getNewModels(products));
  const uniqueProducts = getUniqueProducts(newModels);
  const hotestPrices = getTheHotestPrices(products);
  const uniqueTheHotestPrices = getUniqueProducts(hotestPrices);

  return (
    <main className={styles['home-page']}>
      <Hero />
      <div className={styles.slider}>
        <ProductsSlider products={uniqueProducts} title="Brand new models" />
      </div>

      <CategoryShop />

      <div className={styles.slider}>
        <ProductsSlider
          products={uniqueTheHotestPrices}
          title="Hot prices"
          checkPrice
        />
      </div>
    </main>
  );
};
