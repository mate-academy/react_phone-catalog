import React, { useEffect, useState } from 'react';
import '../style/main.scss';
import { ProductCard } from './ProductCard';
import { client } from '../utils/fetchClient';
import { Phone } from '../Type/Phone';

export const HotPrices: React.FC = () => {
  const [phones, setPhones] = useState<Phone[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(false);

  // eslint-disable-next-line max-len
  const dsfs = 'https://mate-academy.github.io/react_phone-catalog/_new/products.json';

  useEffect(() => {
    client.get<Phone[]>('/_new/products.json')
      .then(setPhones)
      .catch(setErrorMessage)
      .finally(() => setLoading(false));
  }, []);

  console.log(phones);
  console.log(loading);
  console.log(errorMessage);

  return (
    <div className="container--hot">
      <div className="hot__prices">
        <h1>Hot prices</h1>

        <div className="button__container">
          <button
            type="button"
            aria-label="Mute volume"
            className="button button__left"
          />
          <button
            type="button"
            aria-label="Mute volume"
            className="button button__right"
          />
        </div>
      </div>

      {phones.map(phone => (
        <ProductCard
          key={phone.id}
          phone={phone}
        />
      ))}

    </div>
  );
};
