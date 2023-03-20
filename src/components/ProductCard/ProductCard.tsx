import React from 'react';
import { Link } from 'react-router-dom';
import { ProductItem } from '../../types/ProductItem';
import { AddToCartBtn } from '../AddToCartBtn';

import './productCard.scss';
import { AddFavouriteBtn } from '../AddFavouriteBtn';

type Props = {
  card: ProductItem;
};

export const ProductCard: React.FC<Props> = ({ card }) => {
  const discount = (card.price / 100) * card.discount;

  const isDiscounted = (() => (
    <>
      {`$${card.price - discount}`}
      <span>{`$${card.price}`}</span>
    </>
  ));

  const notDiscounted = (() => (
    <>
      {`$${card.price}`}
    </>
  ));

  const isCapasity = (() => (
    <>
      <span>Capacity</span>
      <div className="product-card__propValue">
        {card.capacity}
      </div>
    </>
  ));

  const isRam = (() => (
    <>
      <span>RAM</span>
      <div className="product-card__propValue">
        {card.ram}
      </div>
    </>
  ));

  return (
    <div className="product-card">
      <Link to={`/${card.type}s/${card.id}`}>
        <img
          src={`${process.env.REACT_APP_IMG_LINK}${card.imageUrl}`}
          alt=""
          className="product-card__image"
        />
      </Link>

      <h3 className="product-card__title">
        {card.name}
      </h3>

      <span className='"product-card__price"'>
        {card.discount > 0
          ? isDiscounted()
          : notDiscounted}
      </span>

      <div className="product-card__properties">
        <div className="product-card__propItem">
          <span>Screen</span>
          <div className="product-card__propValue">
            {card.screen}
          </div>
        </div>

        <div className="product-card__propItem">
          {card.capacity && (isCapasity())}
        </div>

        <div className="product-card__propItem">
          {card.ram && (isRam())}
        </div>

        <div className="product-card__nav">
          <AddToCartBtn id={card.id} card={card} />

          <AddFavouriteBtn id={card.id} card={card} />
        </div>

      </div>
    </div>
  );
};
