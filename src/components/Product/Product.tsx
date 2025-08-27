import React from 'react';
import './Product.scss';
import { ProductType } from '../../types/ProductType';
import { NavLink, useLocation } from 'react-router-dom';
import { ActionButtons } from '../ActionButtons';

interface Props {
  model: ProductType;
}

export const Product: React.FC<Props> = ({ model }) => {
  const id = model.itemId;

  const location = useLocation();

  return (
    <article className="product-card">
      <NavLink
        to={`/${model.category}/product/:${model.itemId}`}
        state={{ from: location.pathname }}
        className="product-card__link"
      >
        <img
          src={model.image}
          alt="name of model"
          className="product-card__img"
        />
      </NavLink>

      <NavLink
        className="product-card__product-link"
        to={`/${model.category}/product/:${model.itemId}`}
        state={{ from: location.pathname }}
      >
        <h3 className="product-card__title">{model.name}</h3>
      </NavLink>

      <div className="product-card-price product-card-price--line">
        <strong className="product-card-price__current">${model.price}</strong>
        <div className="product-card-price__old">${model.fullPrice}</div>
      </div>

      <div className="product-card-info product-card-info--margin">
        <div className="product-card-info-box">
          <div className="product-card-info-box__name">screen:</div>
          <div className="product-card-info-box__ch">{model.screen}</div>
        </div>
        <div className="product-card-info-box">
          <div className="product-card-info-box__name">capacity:</div>
          <div className="product-card-info-box__ch">{model.capacity}</div>
        </div>
        <div className="product-card-info-box">
          <div className="product-card-info-box__name">ram:</div>
          <div className="product-card-info-box__ch">{model.ram}</div>
        </div>
      </div>

      <ActionButtons id={id} price={model.price} />
    </article>
  );
};
