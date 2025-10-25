import React, { FC } from 'react';
import vaforiteImg from './../../images/icons/Favourites (Heart Like).svg';
import vaforiteImgSelected from './../../images/icons/Favourites (Heart Like)_2.svg';
import fakeImg from './../../images/img/phones//apple-iphone-11/black/00.webp';

import './ProductCard.scss';
import { Product } from '../../types/Product';

type Props = {
  product: Product;
};

export const ProductCard: FC<Props> = ({ product }) => {
  const { name, price, screen, capacity, ram, fullPrice } = product;
  return (
    <div className="card">
      <a href="#" className="card__link">
        <img src={fakeImg} alt="" className="card__image" />
        <div className="card__title">{name}</div>
        <div className="card__price">
          <span className="card__price--sale">${price}</span>
          <span className="card__price--full">${fullPrice}</span>
        </div>
      </a>
      <div className="card__block">
        <div className="card__info">
          <div className="card__param">
            <span className="card__param_name">Screen</span>
            <span className="card__param_value">{screen}</span>
          </div>
          <div className="card__param">
            <span className="card__param_name">Capacity</span>
            <span className="card__param_value">{capacity}</span>
          </div>
          <div className="card__param">
            <span className="card__param_name">RAM</span>
            <span className="card__param_value">{ram}</span>
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
    </div>
  );
};
