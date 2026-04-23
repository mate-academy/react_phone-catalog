import { Hero } from '../Hero/Hero';
import { BannerSlider } from '../BannerSlider/BannerSlider';
import { ProductSection } from '../ProductSection/ProductSection';
import { ShopByCategory } from '../ShopByCategory';
import {
  getHotPriceProducts,
  getNewModelsProducts,
} from '../../../../utils/products';
import styles from './Main.module.scss';
import { useShop } from '../../../../store/shop/ShopContext';

export const Main = () => {
  const { products } = useShop();
  const hotPriceProducts = getHotPriceProducts(products);
  const newModelsProducts = getNewModelsProducts(products);

  return (
    <main className={styles.main}>
      <Hero />
      <BannerSlider />
      <div className={styles.sections}>
        <ProductSection title="Brand new models" products={newModelsProducts} />
        <ShopByCategory />
        <ProductSection
          title="Hot prices"
          products={hotPriceProducts}
          showDiscount
        />
      </div>
    </main>
  );
};
