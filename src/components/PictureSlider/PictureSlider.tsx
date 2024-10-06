import './PictureSlider.module.scss';
import React from 'react';
import { ProductCard } from '../ProductCard';
import { Product } from '../../types/Product';

type Props = {
  products: Product[];
};

export const PictureSlider: React.FC<Props> = ({ products }) => {
  return (
    <div className="picture__slider">
      {products.map(el => (
        <ProductCard product={el} key={el.id} slider={true} />
      ))}
    </div>
  );
};
