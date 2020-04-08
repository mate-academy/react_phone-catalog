import React from 'react';
import './PhonesCatalog.scss';
import { ProductCard } from './ProductCard/ProductCard';

export const PhonesCatalog = (props) => {
  const { phones } = props;

  return (
    <>
      {/* <div>nen{phones[2].id}</div> */}
      <ProductCard phones={phones} />
      <div className="catalog">
        <ul className="catalog__product-list">
          {phones.map(phone => (
            <li key={phone.age} className="catalog__product-item">
              <img
                src={phone.imageUrl}
                alt="/"
                className="catalog__product-img"
              />
              {phone.id}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};
