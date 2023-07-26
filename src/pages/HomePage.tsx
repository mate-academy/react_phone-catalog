import React from 'react';
import { Carousel } from '../components/Carousel/Carousel';
import { ProductsSlider } from '../components/ProductsSlider/ProductsSlider';
import { Product } from '../types/Product';

type Props = {
  products: Product[];
};

export const HomePage: React.FC<Props> = ({ products }) => {
  const getHotPriceProducts = products
    .filter((product) => product.discount > 0)
    .sort((a, b) => a.discount - b.discount);

  const getBrandNewProducts = products
    .filter((product) => product.discount === 0)
    .sort((a, b) => b.price - a.price);

  return (
    <div className="container">
      <Carousel />

      <ProductsSlider title="Hot prices" products={getHotPriceProducts} />

      <ProductsSlider title="Brand new models" products={getBrandNewProducts} />
    </div>
  );
};
