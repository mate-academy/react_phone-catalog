import React from 'react';
import { Slider } from '../../../components/Slider/Slider';
import { Product } from '../../../types/Product';

type Props = {
  products: Product[];
};

export const SuggestedProducts: React.FC<Props> = ({ products }) => {
  if (!products.length) {
    return null;
  }

  return (
    <Slider
      title="You may also like"
      products={products}
      showDiscount={false}
    />
  );
};
