import React from 'react';
import { ProductsSlider } from '../ProductsSlider';
import { Products } from '../../types/Types';

type Props = {
  title: string;
  products: Products[];
};

export const HotPrice: React.FC<Props> = ({ title, products }) => (
  <ProductsSlider titleLine1={title} products={products} />
);
