import styles from './HomePage.module.scss';
import { Hero } from './components/Hero';
import { ProductsSlider } from './components/ProductsSlider';
import { getNewModels } from '../../utils/getNewModels';
import { sortById } from '../../utils/sortById';
import { useProducts } from '../../hooks/useProducts';
import { getUniqueProducts } from '../../utils/getUniqueProducts';
import { CategoryShop } from './components/CategoryShop';
import { getTheHotestPrices } from '../../utils/getTheHotestPrices';
import { useErrorHandling } from '../../hooks/errorHandling';
import { Loader } from '../../components/Loader';

export const HomePage = () => {
  const { setIsError } = useErrorHandling();
  const { products } = useProducts(() => setIsError(true));
  const newModels = sortById(getNewModels(products));
  const uniqueProducts = getUniqueProducts(newModels);
  const hotestPrices = getTheHotestPrices(products);
  const uniqueTheHotestPrices = getUniqueProducts(hotestPrices);

  if (products.length === 0) {
    return <Loader />;
  }

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
