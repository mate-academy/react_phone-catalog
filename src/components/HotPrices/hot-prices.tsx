import React, { useEffect, useState } from 'react';
import phones from '../../../public/api/phones.json';
import type { Phone } from '../../Types/type';
import './hot-prices.scss';

export const HotPrices = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const itemsPerPage = 4;
  const maxIndex = Math.max(0, phones.length - itemsPerPage);

  const handlePrev = () => {
    setCurrentIndex(prev => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex(prev => Math.min(maxIndex, prev + 1));
  };

  return (
    <div className="newmodels">
      <div className="newmodels__topbar">
        <h2 className="newmodels__topbar__title">Hot prices</h2>
        <div className="newmodels__topbar__buttons">
          <button
            className="newmodels__topbar__buttons__left"
            onClick={handlePrev}
            disabled={currentIndex === 0}
          >
            &lt;
          </button>
          <button
            className="newmodels__topbar__buttons__right"
            onClick={handleNext}
            disabled={currentIndex >= maxIndex}
          >
            &gt;
          </button>
        </div>
      </div>

      <div className="newmodels__products">
        <div
          className="newmodels__products__slider"
          style={{
            transform: `translateX(-${currentIndex * (272 + 64 + 16)}px)`,
          }}
        >
          {phones.map((phone: Phone) => (
            <article className="newmodels__product" key={phone.id}>
              <img
                className="newmodels__product__image"
                src={phone.images[0]}
                alt={phone.id}
              />
              <p className="newmodels__product__name">{phone.name}</p>
              <div className="newmodels__product__prices">
                <h4 className="newmodels__product__prices__price">
                  ${phone.priceDiscount}
                </h4>
                <h4 className="newmodels__product__prices__discount">
                  ${phone.priceRegular}
                </h4>
              </div>
              <hr className="newmodels__product--line" />

              <div className="newmodels__product__description">
                <p className="newmodels__product__description__screen">
                  Screen
                </p>
                <p className="newmodels__product__description__screen--number">
                  {phone.screen}
                </p>
              </div>
              <div className="newmodels__product__description">
                <p className="newmodels__product__description__capacity">
                  Capacity
                </p>
                <p className="newmodels__product__description__capacity--number">
                  {phone.capacity}
                </p>
              </div>
              <div className="newmodels__product__description">
                <p className="newmodels__product__description__ram">RAM</p>
                <p className="newmodels__product__description__ram--number">
                  {phone.ram}
                </p>
              </div>

              <div className="newmodels__product__buttons">
                <button className="newmodels__product__buttons__button__add">
                  Add to cart
                </button>
                <button className="newmodels__product__buttons__button__favourites">
                  <span className="newmodels__product__buttons__button__favourites--heart"></span>
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};
