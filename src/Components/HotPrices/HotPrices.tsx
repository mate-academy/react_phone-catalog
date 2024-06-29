import './HotPrices.scss';
import { ProductCard } from '../ProductCard';
import React, { useContext } from 'react';
import { getHotPrices } from '../../utils/getHotPrices';
import { ProductContext } from '../../store/ProductContext';

export const HotPrices: React.FC = ({}) => {
  const { phones } = useContext(ProductContext);

  const hotPrices = getHotPrices(phones);

  return (
    <>
      <div className="hot-prices">
        <h1 className="hot-prices__title">Hot prices</h1>

        <div className="new-models__cards">
          {hotPrices.slice(0, 4).map(card => (
            <ProductCard key={card.id} product={card} />
          ))}
        </div>
      </div>
    </>
  );
};
