import { useMemo } from 'react';
import { useAppSelector } from '../../redux/hooks';
import { selectProducts } from '../../redux/slices/productsSlice';
import {
  getBrandNewProducts,
  getHotPricesProducts,
} from '../../utils/getSliderProducts';
import { PicturesSlider } from '../PicturesSlider';
import { ProductsSlider } from '../ProductsSlider';
import { ShopByCategory } from '../ShopByCategory';
import styles from './HomePage.module.scss';

export const HomePage = () => {
  const { products } = useAppSelector(selectProducts);

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
