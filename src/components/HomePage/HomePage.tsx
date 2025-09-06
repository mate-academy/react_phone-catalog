import styles from './HomePage.module.scss';
import { BannerSlider } from '../BannerSlider';
import { ProductList } from '../ProductList';
import { useNewestProducts } from '../../hooks/useNewestProducts';
import { ShopByCategory } from '../ShopByCategory';
import { useProducts } from '../../hooks/useProducts';

export const HomePage = () => {
  const { newestProducts } = useNewestProducts();
  const { topDiscounted } = useProducts('phones');

  return (
    <div className={styles.homePage}>
      <h1 className={styles.homePage__title}>Welcome to Nice Gadgets store!</h1>
      <BannerSlider />
      <ProductList
        title={'Brand new models'}
        products={newestProducts}
        showOldPrice={false}
      />
      <ShopByCategory />
      <ProductList
        title={'Hot prices'}
        products={topDiscounted}
        showOldPrice={true}
      />
    </div>
  );
};
