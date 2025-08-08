import React from 'react';
import './ProductCard.scss';

export const ProductCard: React.FC = () => {
  return (
    <div className="product">
      <div className="product__characteristics">
        <img
          className="product__image"
          src="/img/phones/apple-iphone-14-pro/gold/00.webp"
          alt="product image"
        />
        <p className="product__description">
          Apple iPhone 14 Pro 128GB Silver (MQ023)
        </p>
        <p className="product__price">$999</p>
      </div>

      <div className="product__details">
        <div className="product__details-row">
          <div className="product__details-name">Screen</div>
          <div className="product__details-value">6.1” OLED</div>
        </div>
        <div className="product__details-row">
          <div className="product__details-name">Capacity</div>
          <div className="product__details-value">128 GB</div>
        </div>
        <div className="product__details-row">
          <div className="product__details-name">RAM</div>
          <div className="product__details-value">6 GB</div>
        </div>
      </div>

      <div className="product__button">
        <button className="product__button--add">Add to cart</button>
        <button className="product__button--favourite">
          <img
            src="/img/icons/icon-favourites.svg"
            alt="favourites icon"
            className="product__button-icon"
          />
        </button>
      </div>
    </div>
  );
};
