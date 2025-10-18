import React, { FC } from 'react';
import vaforiteImg from './../../images/icons/Favourites (Heart Like).svg';
import vaforiteImgSelected from './../../images/icons/Favourites (Heart Like)_2.svg';
import fakeImg from './../../images/img/phones//apple-iphone-11/black/00.webp';

import './ProductCard.scss';

type Props = {
  product: {};
};

export const ProductCard: FC<Props> = ({ product }) => {
  return (
    <div className="card">
      <a href="#" className="card__link">
        <img src={fakeImg} alt="" className="card__image" />
        <div className="card__title">
          Apple iPhone 14 Pro 128GB Silver (MQ023)
        </div>
        <div className="card__price">$999</div>
      </a>
      <div className="card__info">
        <div className="card__param">
          <span className="card__param_name">Screen</span>
          <span className="card__param_value">6.1” OLED</span>
        </div>
        <div className="card__param">
          <span className="card__param_name">Capacity</span>
          <span className="card__param_value">128 GB</span>
        </div>
        <div className="card__param">
          <span className="card__param_name">RAM</span>
          <span className="card__param_value">6 GB</span>
        </div>
      </div>
      <div className="card__buttons">
        <button className="card__add card__add_selected">Add to cart</button>
        <a className="card__favorite card__favorite_selected">
          <img src={vaforiteImg} alt="" />
          {/* <img src={vaforiteImgSelected} alt="" /> */}
        </a>
      </div>
    </div>
  );
};
