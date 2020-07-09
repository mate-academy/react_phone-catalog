import { Link } from 'react-router-dom';
import React from 'react';
import './ProductCard.scss';
import AddToCartButton from '../../AddToCartButton/AddToCartButton';
import AddToFavorButton from '../../AddToFavorButton/AddToFavorButton';

type Props = {
  type: string;
  product: ProductItem;
};

export const ProductCard: React.FC<Props> = ({
  type,
  product,
}) => {
  const {
    id,
    imageUrl,
    name,
    price,
    discount,
    screen,
    capacity,
    ram,
  } = product;

  return (
    <div className="products__card card">
      <Link to={`/${type}s/${id}`} className="linkToProduct">
        <img className="card__img" src={imageUrl} alt="products img" />
      </Link>
      <div className="card__infoWrap">
        <Link to={`/${type}s/${id}`} className="linkToProduct">
          <div className="card__title">{name}</div>
        </Link>
        <h2 className="card__price card__price--discount">
          $
          {(price - price * (discount / 100))}
          {' '}
          {discount !== 0
              && (
                <span className="card__price card__price--full">
                  $
                  {price}
                </span>
              )}
        </h2>
        <div className="card__details details">
          <div className="details__info">
            <div className="details__info--name">Screen</div>
            <div className="details__info--value">{screen}</div>
          </div>
          <div className="details__info">
            <div className="details__info--name">Capacity</div>
            <div className="details__info--value">{capacity}</div>
          </div>
          <div className="details__info">
            <div className="details__info--name">RAM</div>
            <div className="details__info--value">{ram}</div>
          </div>
        </div>
        <div className="card__buttons button">
          <AddToCartButton product={product} />
          <AddToFavorButton product={product} />
        </div>
      </div>
    </div>
  );
};
