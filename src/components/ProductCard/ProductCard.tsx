import { Link } from 'react-router-dom';
import './ProductCard.scss';
import React from 'react';
import { Gadget } from '../../types/Gadget';
import { ButtonAddCart } from '../ButtonAddCart';
import { ButtonHeart } from '../ButtonHeart';

type Props = {
  gadget: Gadget;
};

export const ProductCard: React.FC<Props> = ({ gadget }) => {
  const {
    id,
    itemId,
    name,
    category,
    capacity,
    fullPrice,
    price,
    screen,
    ram,
    image,
  } = gadget;

  return (
    <div className="product-card">
      <Link to={`/${category}/${itemId}`} className="product-card__img-link">
        <img className="product-card__img-link--img" src={image} alt={name} />
      </Link>
      <Link to={`/${category}/${itemId}`} className="product-card__title-link">
        <p className="product-card__title-link--title">{name}</p>
      </Link>
      <div className="product-card__price">
        {price ? (
          <>
            <p className="product-card__price--regular">{`$${price}`}</p>
            <p className="product-card__price--regular price-disc">{`$${fullPrice}`}</p>
          </>
        ) : (
          <p className="product-card__price--regular">{`$${fullPrice}`}</p>
        )}
      </div>
      <ul className="product-card__list">
        <li className="product-card__list--item product-list-item">
          <p className="product-list-item__name">Screen</p>
          <p className="product-list-item__param">{screen}</p>
        </li>
        <li className="product-card__list--item item">
          <p className="product-list-item__name">Capacity</p>
          <p className="product-list-item__param">{capacity}</p>
        </li>
        <li className="product-card__list--item item">
          <p className="product-list-item__name">RAM</p>
          <p className="product-list-item__param">{ram}</p>
        </li>
      </ul>
      <div className="product-card__btn">
        <ButtonAddCart productId={id} />
        <ButtonHeart productId={id} />
      </div>
    </div>
  );
};
