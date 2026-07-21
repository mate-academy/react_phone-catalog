import { useState, useEffect } from 'react';
import { getHotProducts, getBrandNewProducts } from '../../api/products';
import { Product } from '../../types/Product';
import { PicturesSlider } from '../PicturesSlider';
import { ProductsSlider } from '../ProductsSlider';
import { ShopByCategory } from '../ShopByCategory';
import styles from './HomePage.module.scss';

export const HomePage = () => {
  const [hotProducts, setHotProducts] = useState<Product[]>([]);
  const [brandNewProducts, setBrandNewProducts] = useState<Product[]>([]);

  useEffect(() => {
    getHotProducts().then(setHotProducts);
    getBrandNewProducts().then(setBrandNewProducts);
  }, []);

  return (
    <div className={styles.page}>
      <h1 className="visually-hidden">Product Catalog</h1>
      <PicturesSlider />
      <ProductsSlider title="Hot prices" products={hotProducts} />
      <ShopByCategory />
      <ProductsSlider
        title="Brand new"
        products={brandNewProducts}
        hideDiscount
      />
    </div>
  );
};
