import { useCallback, useEffect, useState } from 'react';
import { getProduct } from '../../../shared/utils/fetchClient';
import { ProductSlider } from '../ProductSlider/ProductSlider';
import { Slider } from '../Slider';
import { Product } from '../../../shared/utils/types/apiTypes';
import { ShopByCategory } from '../ShopByCategory';
import styles from './HomePage.module.scss';

export const HomePage = () => {
  const [products, setProducts] = useState<Product[] | undefined>();

  const loadProducts = useCallback(() => {
    getProduct('/products.json').then(data => setProducts(data));
  }, []);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  const biggestDiscount = products
    ?.sort((a, b) => b.fullPrice - b.price - (a.fullPrice - a.price))
    .slice(0, 6);
  const newestProducts = products?.sort((a, b) => b.year - a.year).slice(0, 6);

  return (
    <div className={styles.home}>
      <h1>Welcome to Nice Gadgets store!</h1>
      <Slider />
      <ProductSlider products={biggestDiscount} header={'Hot prices'} />
      <ShopByCategory />
      <ProductSlider products={newestProducts} header={'Brand new models'} />
    </div>
  );
};
