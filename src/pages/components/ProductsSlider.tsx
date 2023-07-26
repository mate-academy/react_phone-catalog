import { FC } from 'react';
import { ProductCard } from './ProductCard';
import '../../styles/blocks/products-slider.scss';

export const ProductsSlider: FC = () => {
  return (
    <div className="products-slider">
      <ProductCard />
      <ProductCard />
      <ProductCard />
      <ProductCard />
    </div>
  );
};
