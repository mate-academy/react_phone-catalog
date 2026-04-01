import { Hero } from '../Hero/Hero';
import { BannerSlider } from '../BannerSlider/BannerSlider';
import { ProductSection } from '../ProductSection/ProductSection';
import { ShopByCategory } from '../ShopByCategory';
import { getHotPriceProducts } from '../../../../utils/products';
import styles from './Main.module.scss';
import { useShop } from '../../../../store/ShopContext';

export const Main = () => {
  const { products } = useShop();
  const hotPriceProducts = getHotPriceProducts(products);

  return (
    <main className={styles.main}>
      <Hero />
      <BannerSlider />
      <ProductSection title="Brand new models" products={products} />
      <ShopByCategory />
      <ProductSection
        title="Hot prices"
        products={hotPriceProducts}
        showDiscount
      />
    </main>
  );
};
