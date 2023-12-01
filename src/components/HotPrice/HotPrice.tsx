import React, { useContext } from 'react';
import { ProductSlider } from '../ProductSlider/ProductSlider';
import './HotPrice.scss';
import { AppContext } from '../../context/AppContext';

export const HotPrice: React.FC = () => {
  const { hotPriceProducts } = useContext(AppContext);

  return (
    <div className="hot-price" data-cy="cardsContainer">
      <ProductSlider
        title="Hot Price"
        products={hotPriceProducts}
      />
    </div>
  );
};
