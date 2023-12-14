import React, { useContext, useEffect, useState } from 'react';
import { ProductsSlider } from '../ProductsSlider/ProductsSlider';
import { GlobalContext } from '../../Context/GlobalContext';
import { Product } from '../../types/Product';

import './BrandNew.scss';

export const BrandNew: React.FC = () => {
  const { products } = useContext(GlobalContext);
  const [brandNew, setBrandNew] = useState<Product[]>([]);

  useEffect(() => {
    const currentProducts = [...products];
    const mostExpProducts = currentProducts
      .sort((a, b) => b.fullPrice - a.fullPrice);

    setBrandNew(mostExpProducts);
  }, [products]);

  return (
    <section className="brand-new-models">
      <ProductsSlider
        sliderTitle="Brands new models"
        items={brandNew}
        discount={false}
      />
    </section>
  );
};
