import React, { useEffect, useState } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { v4 as uuidv4 } from 'uuid';
import ProductsSlider from '../ProductsSlider/ProductSlider';
import './HotPrices.scss';
import { getHotPriceProducts } from '../../helpers/apis';
import { Product } from '../../helpers/types/Product';

export const HotPrices: React.FC = () => {
  const [productData, setProductData] = useState<Product[]>([]);

  useEffect(() => {
    getHotPriceProducts('products.json')
      .then((data: any) => setProductData(data));
  }, []);

  return (
    <div className="hotprices">
      <div className="hotprices-header">
        <ProductsSlider
          sliderId={`hotPricesSlider-${uuidv4()}`}
          productData={productData}
          title="Hot prices"
        />
      </div>
    </div>
  );
};
