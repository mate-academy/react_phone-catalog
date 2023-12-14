import React from 'react';
import { Product } from '../../types/Product';
import { ProductsSlider } from '../ProductsSlider/ProductsSlider';

type Props = {
  youMayLike: Product[];
};

export const YouMayLike: React.FC<Props> = ({ youMayLike }) => {
  return (
    <section className="you-may-like">
      <ProductsSlider
        sliderTitle="You May Like"
        items={youMayLike}
        discount
      />
    </section>
  );
};
