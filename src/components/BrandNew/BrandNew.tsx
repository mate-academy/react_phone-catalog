import React, { useState, useContext, useEffect } from 'react';
import { GlobalContext } from '../../Context/GlobalContext';
import { Product } from '../../types/Product';
import './BrandNew.scss';
import { ProductsSlider } from '../ProductsSlider/ProductsSlider';

export const BrandNew: React.FC = () => {
  const [brandNew, setBrandNew] = useState<Product[]>([]);
  const { products } = useContext(GlobalContext);

  useEffect(() => {
    const currentProducts = [...products];
    const mostExpProducts = currentProducts
      .sort((a, b) => b.fullPrice - a.fullPrice);

    setBrandNew(mostExpProducts);
  }, [products]);

  return (
    <section className="brand-new-models">
      <ProductsSlider
        sliderTitle="Brand new models"
        items={brandNew}
        discount={false}
      />
    </section>
  );
};
