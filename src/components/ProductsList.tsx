import React from 'react';
import { ProductCard } from './ProductCard';
import { Phone } from '../types/Phone';

type Props = {
  phones: Phone [];
};

export const ProductsList: React.FC<Props> = ({ phones }) => {
  return (
    <ul className="phones-page__list" data-cy="productList">
      {phones.map(card => (
        <li key={card.id}>
          <ProductCard phone={card} />
        </li>
      ))}
    </ul>
  );
};
