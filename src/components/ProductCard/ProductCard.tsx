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
      {`$${(card.price - discount).toFixed(0)}`}
      <span>{`$${card.price}`}</span>
    </>
  ));

  const notDiscounted = (() => (
    <>
      {`$${card.price}`}
    </>
  ));

  const isCapacity = (() => (
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
      <Link to={`/${card.type}s/${card.id}`} className="product-card__image">
        <img src={card.imageUrl} alt="" />
      </Link>

      <h3 className="product-card__title">
        {card.name}
      </h3>
      <span className="product-card__price">
        {card.discount > 0
          ? (isDiscounted())
          : (notDiscounted())}
      </span>
      <div className="product-card__properties">
        <div className="product-card__propItem">
          <span>Screen</span>
          <div className="product-card__propValue">
            {card.screen}
          </div>
        </div>
        <div className="product-card__propItem">
          {card.capacity && (isCapacity())}
        </div>
        <div className="product-card__propItem">
          {card.ram && (isRam())}
        </div>
      </div>
      <div className="product-card__nav">
        <AddToCartBtn id={card.id} />
        <AddFavouriteBtn id={card.id} />
      </div>
    </div>
  );
};
