import React from 'react';
import './PhonesPage.scss';
import { ProductCard } from '../ProductCard';

type Props = {
  products: ProductItem[];
};

export const PhonesPage: React.FC<Props> = ({ products }) => {
  return (
    <div className="phones__container phones">
      <h1 className="phones__title">Mobile phones</h1>
      <p className="phones__quantity">
        {products.length}
        {' '}
        <span className="phones__quantityText">models</span>
      </p>
      <div className="phones__list">
        {products.map(product => (
          <ProductCard {...product} />
        ))}
      </div>
    </div>
  );
};
