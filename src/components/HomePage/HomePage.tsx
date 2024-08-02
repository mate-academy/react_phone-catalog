import { useContext, useMemo } from 'react';
import { AppContext } from '../../Root';
import { getBrandNewProducts } from '../../utils/getBrandNewProducts';
import { getHotPricesProducts } from '../../utils/getHotPricesProducts';
import { PicturesSlider } from '../PicturesSlider';
import { ProductsSlider } from '../ProductsSlider';
import { ShopByCategory } from '../ShopByCategory';
import styles from './HomePage.module.scss';

export const HomePage = () => {
  const { products } = useContext(AppContext);

  const brandNewProducts = useMemo(
    () => getBrandNewProducts(products),
    [products],
  );

  const hotPricesProducts = useMemo(
    () => getHotPricesProducts(products),
    [products],
  );

  return (
    <div className={styles.homePage}>
      <h1 className={styles.title}>Welcome to Nice Gadgets store!</h1>

      <PicturesSlider />

      <ProductsSlider
        title="Brand new models"
        products={brandNewProducts}
        showFullPriceOnly={true}
      />

      <ShopByCategory />

      <ProductsSlider title="Hot prices" products={hotPricesProducts} />
    </div>
  );
};
