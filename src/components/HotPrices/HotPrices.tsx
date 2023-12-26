import React, {
  useContext,
} from 'react';
import { AppContext } from '../../store/AppProvider';
import { getHotPriceProducts } from '../../api/products';
import { ProductsSlider } from '../ProductsSlider';

import './HotPrices.scss';

export const HotPrices: React.FC = () => {
  const { products } = useContext(AppContext);

  return (
    <div className="HotPrices HotPrices__container">
      <ProductsSlider
        title="Hot prices"
        products={getHotPriceProducts(products).slice(0, 16)}
      />
    </div>

  );
};
