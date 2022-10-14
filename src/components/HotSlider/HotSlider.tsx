/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useContext } from 'react';

import './HotSlider.scss';
import { ProductsContext } from '../../helpers/ProductsContext';
import { ProductsSlider } from '../ProductsSlider';

export const HotSlider: React.FC = () => {
  const { products } = useContext(ProductsContext);
  const prodWithDiscount = products.filter(product => product.discount > 0);

  return (
    <section className="section hot-prices">
      <ProductsSlider
        title="Hot prices"
        products={prodWithDiscount}
      />
    </section>
  );
};
