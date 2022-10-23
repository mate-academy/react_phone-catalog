import React, { useContext } from 'react';
import { ProductsContext } from '../../helpers/ProductsContext';
import { ProductsSlider } from '../ProductsSlider';

export const BrandNew: React.FC = () => {
  const { products } = useContext(ProductsContext);

  const prodWithoutDiscount = products.filter(product => (
    product.discount === 0
  ));

  prodWithoutDiscount.sort((item1, item2) => item2.price - item1.price);

  return (
    <section className="section">
      <ProductsSlider
        title="Brand new"
        products={prodWithoutDiscount}
      />
    </section>
  );
};
