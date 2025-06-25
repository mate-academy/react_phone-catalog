import React from 'react';
import './ItemCard.scss';

export const ItemCard = () => {
  return (
    <section className="item-card">
      <div className="container item-card__container">
        <div className="item-card__bradcrumbs">
          <span>&#9813; </span>
          <span>&#62;</span>
          <span>home</span>
        </div>
        <a href="#" className="item-card__back">
          <span>&#60;</span>
          <span>back</span>
        </a>

        <div className="item-card__title">
          Apple iPhone 11 Pro Max 64GB Gold (iMT9G2FS/A)
        </div>
        <div className="item-card__wrapper">
          <div className="item-card__slider"></div>
          <img src="" alt="" className="item-card__photo" />
          <div className="item-card__desc"></div>
          <div className="item-card__id"></div>
        </div>
      </div>
    </section>
  );
};
