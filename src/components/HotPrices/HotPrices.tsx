import React from 'react';
import './HotPrices.scss';

export const HotPrices = () => {
  return (
    <section className="hot-prices">
      <div className="section-wrapper">
        <div className="hot-prices__box">
          <h1 className="hot-prices__title">
            Hot prices
          </h1>
          <div className="buttons-box">
            <button
              type="button"
              className="buttons-box__button buttons-box__button-left"
            />
            <button
              type="button"
              className="buttons-box__button buttons-box__button-right"
            />
          </div>
        </div>
        <div className="hot-prices__cards">
          <div className="hot-card">
            <img
              src="./img/hot-prices/iphone-xs-64.png"
              alt="iphone-xs"
              className="hot-card__image"
            />
            <p className="hot-card__phone-name">
              Apple iPhone Xs 64GB Silver (iMT9G2FS/A)
            </p>
            <h2 className="hot-card__price">
              <span className="hot-card__new-price">$799</span>
              <span className="hot-card__old-price">$899</span>
            </h2>
            <div className="phone-specs">
              <div className="phone-specs__item">
                <span className="phone specs__name">Screen</span>
                <span className="phone specs__name">5.8” OLED</span>
              </div>
              <div className="phone-specs__item">
                <span className="phone specs__name">Capacity</span>
                <span className="phone specs__name">64 GB</span>
              </div>
              <div className="phone-specs__item">
                <span className="phone specs__name">RAM</span>
                <span className="phone specs__name">4 GB</span>
              </div>
            </div>
            <button
              type="button"
              className="hot-card__button"
            >
              Add to cart
            </button>
            <span className="hot-card__likes" />
          </div>
        </div>
      </div>
    </section>
  );
};
