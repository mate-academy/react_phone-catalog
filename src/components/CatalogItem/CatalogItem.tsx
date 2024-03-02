import React from 'react';
import './CatalogItem.scss';
import { Phone } from '../../types/Phone';

type Props = {
  phone: Phone;
};

export const CatalogItem: React.FC<Props> = ({ phone }) => {
  // console.log(phone);

  return (
    <>
      <img
        src={`../${phone.imageUrl}`}
        alt={phone.name}
        className="catalog-item--img"
      />

      <p className="catalog-item--title">{phone.name}</p>
      <div className="catalog-item--price-row">
        {phone.discount !== 0 ? (
          <>
            <span className="catalog-item--new-price">
              ${phone.price - (phone.price * phone.discount) / 100}
            </span>
            <span className="catalog-item--old-price">${phone.price}</span>
          </>
        ) : (
          <span className="catalog-item--new-price">${phone.price}</span>
        )}
      </div>
      <ul className="catalog-item--params">
        <li className="catalog-item--params-item params-item">
          <span className="params-item--title">Screen</span>
          <span className="params-item--value">{phone.screen}</span>
        </li>
        <li className="catalog-item--params-item params-item">
          <span className="params-item--title">Capacity</span>
          <span className="params-item--value">{phone.capacity}</span>
        </li>
        <li className="catalog-item--params-item params-item">
          <span className="params-item--title">RAM</span>
          <span className="params-item--value">{phone.ram}</span>
        </li>
      </ul>
      <div className="catalog-item--buttons">
        <button type="button" className="catalog-item--cart-btn">
          Add to cart
        </button>
        <button type="button" className="catalog-item--fav-btn">
          fav
        </button>
      </div>
    </>
  );
};
