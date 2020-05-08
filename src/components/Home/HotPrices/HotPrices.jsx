import React from 'react';
import './HotPrices.scss';
import leftArrow from '../../../assets/images/icons/back-arrow.svg';
import rightArrow from '../../../assets/images/icons/forvard-arrow.svg';

export const HotPrices = () => {
  return (
    <div className="hotPrices">
      <div className="hotPrices__heading">
        <h1 className="hotPrices__title">Hot prices</h1>
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
      <div className="hotPrices__content">
        hot price content
      </div>
    </div>
  );
};
