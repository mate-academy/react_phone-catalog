import React from 'react';
import BigSlider from '../../components/Slider/BigSlider/ BigSlider';
import { ProductsSlider } from '../../components/Slider/ProductsSlider';
import { Product } from '../../types/Product';
import { Category } from '../../components/Category';
import { useAppSelector } from '../../hooks/DispatchSelector';
import s from './HomePage.module.scss';

export const HomePage: React.FC = () => {
  const products = useAppSelector(state => state.products);
  const years = products.map((product: Product) => product.year);
  const hotPriceProducts = products.filter(
    (product: Product) => product.fullPrice - product.price > 120,
  );
  const latestYear = Math.max(...years);
  const newProducts = products.filter(
    (product: Product) => product.year === latestYear,
  );

  return (
    <>
      <h1 hidden>Product Catalog</h1>
      <h1 className={s.title}>Welcome to Nice Gadgets store!</h1>
      <BigSlider />
      <h2>Brand new models</h2>
      <ProductsSlider products={newProducts} />
      <h2>Shop by category</h2>
      <Category products={products} />
      <h2>Hot prices</h2>
      <ProductsSlider products={hotPriceProducts} showFullPrice />
    </>
  );
};
