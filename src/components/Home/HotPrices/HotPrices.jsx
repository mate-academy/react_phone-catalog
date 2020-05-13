/* eslint-disable react/no-array-index-key */
import React, { useState, useEffect } from 'react';
import './HotPrices.scss';
import leftArrow from '../../../assets/images/icons/back-arrow.svg';
import rightArrow from '../../../assets/images/icons/forvard-arrow.svg';
import { getPhones } from '../../../api/api';
import { ProductCard } from '../../Phones/ProductCard/ProductCard';

export const HotPrices = () => {
  const [phones, setPhones] = useState([]);

  useEffect(() => {
    getPhones()
      .then(data => setPhones(data));
  }, []);

  const hotPrices = phones.slice(5, 15);
  const price = 199;

  return (
    <div className="hotPrices">
      <div className="hotPrices__heading">
        <h1 className="hotPrices__title">Old-school</h1>
        <div>
          <button
            className="hotPrices__btn hotPrices__btn--left"
            type="button"
          >
            <img
              src={leftArrow}
              alt="left"
              className="hotPrices__btn-icon-left"
            />
          </button>
          <button
            className="hotPrices__btn hotPrices__btn--right"
            type="button"
          >
            <img
              src={rightArrow}
              alt="left"
              className="hotPrices__btn-icon-right"
            />
          </button>
        </div>
      </div>
      <ul className="hotPrices__list">
        {hotPrices.map((phone, index) => (
          <li className="hotPrices__item" key={index}>
            <ProductCard
              {...phone}
              itemPrice={price}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};
