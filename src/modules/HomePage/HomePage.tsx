import React, { useEffect, useMemo, useState } from 'react';
import { PicturesSlider } from './components/PicturesSlider';
import style from './HomePage.module.scss';
import { ProductsSlider } from '../shared/components/ProductsSlider';

import { getProducts } from '../shared/utils/api';
import { Product } from '../shared/types/Product';
import { ShopByCategory } from './components/ShopByCategory/ShopByCategory';

export const HomePage = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    getProducts().then(fetchedProducts => setProducts(fetchedProducts));
  }, []);

  const newestProducts = useMemo(() => {
    return [...products].sort((a, b) => b.year - a.year);
  }, [products]);

  const hotPriceProducts = useMemo(() => {
    return [...products].sort(
      (a, b) => b.fullPrice - b.price - (a.fullPrice - a.price),
    );
  }, [products]);

  return (
    <div className={style.HomePage}>
      <h1 className={style.HomePage__title}>Welcome to Nice Gadgets store!</h1>
      <PicturesSlider />
      <ProductsSlider
        title="Brand new models"
        products={newestProducts.slice(0, 10)}
        displayType="fullprice"
      />
      <ShopByCategory />
      <ProductsSlider
        title="Hot prices"
        products={hotPriceProducts.slice(0, 10)}
        displayType="discount"
      />
    </div>
  );
};
