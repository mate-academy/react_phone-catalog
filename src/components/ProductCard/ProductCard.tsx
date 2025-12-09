import React, { FC, useState } from 'react';

import fakeImg from './../../images/img/phones//apple-iphone-11/black/00.webp';

import './ProductCard.scss';
import { Product } from '../../types/Product';
import classNames from 'classnames';
import { ProductCardButtons } from './ProductCardButtons';

type Props = {
  product: Partial<Product>;
};

export const ProductCard: FC<Props> = ({ product }) => {
  const { name, price, screen, capacity, ram, fullPrice } = product;

  return (
    <div className="card">
      <a href="#" className="card__link">
        <img src={product.image} alt="" className="card__image" />
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
        <ProductCardButtons />
      </div>
    </div>
  );
};
