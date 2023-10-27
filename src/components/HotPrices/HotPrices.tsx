import React, { useEffect, useState } from 'react';
import { getHotPriceProducts } from '../../helpers/products';
import { Product } from '../../types/Product';
import { ProductsSlider } from '../ProductsSlider';
import './HotPrices.scss';

export const HotPrices: React.FC = () => {
  const [hotPriceProducts, setHotPriceProducts] = useState<Product[]>([]);

  useEffect(() => {
    getHotPriceProducts()
      .then(setHotPriceProducts);
  }, []);

  return (
    <div className="HotPrices">
      <div className="container">
        <ProductsSlider
          title="Hot prices"
          products={hotPriceProducts}
        />
      </div>
    </div>
  );
};
