import React from 'react';
import './PricesPhone.scss';
import classNames from 'classnames';
import { NavLink } from 'react-router-dom';
import { Product } from '../../type';
import { AddButtonCard } from '../AddButtonCard/AddButtonCard';
import { FavouritesButton } from '../FavouritesButton/FavouritesButton';

type Props = {
  product: Product
};

export const PricesPhone: React.FC<Props> = ({ product }) => {
  return (
    <>
      <NavLink
        className="card__link bodytext"
        to={`/${product.type}s/${product.id}`}
        onClick={() => {
          window.scrollTo({ top: 0 });
        }}
      >
        <img
          className="card__image"
          src={product.imageUrl}
          alt="pictureProduct"
        />
      </NavLink>
      <h3 className="card__title">{product.name}</h3>
      <div className="card__price">
        {product.newPrice !== product.price && (
          <p className="card__newPrice">
            $
            {product.newPrice}
          </p>
        )}
        <p className={classNames({
          card__oldPrice: product.newPrice !== product.price,
          card__newPrice: product.newPrice === product.price,
        })}
        >
          $
          {product.price}
        </p>
      </div>
      <div className="card__line" />
      <div className="card__characteristic">
        <p className="card__name">Screen</p>
        <p className="card__value">{product.screen}</p>
      </div>
      <div className="card__characteristic">
        <p className="card__name">Capacity</p>
        <p className="card__value">{product.capacity}</p>
      </div>
      <div className="card__characteristic">
        <p className="card__name">RAM</p>
        <p className="card__value">{product.ram}</p>
      </div>
      <div className="card__button">
        <AddButtonCard cart product={product} />
        <FavouritesButton cart product={product} />
      </div>
    </>
  );
};
