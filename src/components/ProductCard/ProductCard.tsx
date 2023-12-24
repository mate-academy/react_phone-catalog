import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../../types/Product';
import './ProductCard.scss';
import { Buttons } from '../ButtonsAddLike/Buttons';
import { StorContext } from '../../context/StorContext';

type Props = {
  product: Product
};

export const ProductCard: React.FC<Props> = ({ product }) => {
  const {
    category,
    itemId,
    name,
    fullPrice,
    price,
    screen,
    capacity,
    ram,
    image,
  } = product;

  const { favorites, inCart, isSelectedProduct } = useContext(StorContext);
  const isSelectedFav = isSelectedProduct(itemId, favorites);
  const isSelectedInCart = isSelectedProduct(itemId, inCart);

  return (
    <div className="card" data-cy="cardsContainer">
      <Link
        className="card__image"
        to={`../../${category}/${itemId}`}
      >
        <img src={`https://mate-academy.github.io/react_phone-catalog/_new/${image}`} alt={name} />
      </Link>

      <div className="card__name">
        <Link className="card__name-title" to={`../../${category}/${itemId}`}>
          {name}
        </Link>
      </div>

      <div className="card__prices">
        <span className="card__price">
          {`$${price}`}
        </span>
        <span className="card__price card__price--old">
          {`$${fullPrice}`}
        </span>
      </div>

      <div className="card__line" />

      <div className="card__features">
        <div className="card__feature">
          <span className="card__feature-name">Screen</span>
          <span className="card__feature-value">{screen}</span>
        </div>
        <div className="card__feature">
          <span className="card__feature-name">Capacity</span>
          <span className="card__feature-value">{capacity}</span>
        </div>
        <div className="card__feature">
          <span className="card__feature-name">RAM</span>
          <span className="card__feature-value">{ram}</span>
        </div>
      </div>

      <div className="card__actions">
        <Buttons
          isSelectedFav={isSelectedFav}
          isSelectedInCart={isSelectedInCart}
          product={product}
        />
      </div>
    </div>
  );
};
