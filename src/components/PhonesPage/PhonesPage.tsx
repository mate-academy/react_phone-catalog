import React, { useEffect, useState } from 'react';
import { getProducts } from '../../api/api';
import './PhonesPage.scss';
import { ProductCard } from '../ProductCard';

export const PhonesPage: React.FC = () => {
  const [phonesList, setPhonesList] = useState<ProductItem[]>([]);

  useEffect(() => {
    getProducts()
      .then(data => setPhonesList(data
        .filter((product: ProductItem) => product.type === 'phone')));
  }, []);

  return (
    <div className="phones__container phones">
      <h1 className="phones__title">Mobile phones</h1>
      <p className="phones__quantity">
        {phonesList.length}
        {' '}
        <span className="phones__quantityText">models</span>
      </p>
      <div className="phones__list">
        {phonesList.map(product => (
          <ProductCard {...product} />
        ))}
      </div>
    </div>
  );
};
