import { Link } from 'react-router-dom';
import { Product } from '../../types/Product';
import './ProductCard.scss';
import React from 'react';

type Props = {
  product: Product;
};

export const ProductCard: React.FC<Props> = ({ product }) => {
  const {
    id,
    name,
    capacity,
    priceRegular,
    priceDiscount,
    screen,
    ram,
    images,
  } = product;

  return (
    <div className="product-card">
      <Link to="/product/:productId" className="product-card__img-link">
        <img className="product-card__img-link--img" src={images[0]} alt={id} />
      </Link>
      <Link to="/product/:productId" className="product-card__title-link">
        <p className="product-card__title-link--title">{name}</p>
      </Link>
      <div className="product-card__price">
        {priceDiscount ? (
          <>
            <p className="product-card__price--regular">{`$${priceDiscount}`}</p>
            <p className="product-card__price--regular price-disc">{`$${priceRegular}`}</p>
          </>
        ) : (
          <p className="product-card__price--regular">{`$${priceRegular}`}</p>
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
        <button type="button" className="product-card__btn--add">
          Add to cart
        </button>
        <button type="button" className="product-card__btn--heart">
          <svg className="icon icon-heart icon-heart-red">
            <use href="/img/icons.svg#icon-favourites-filled"></use>
          </svg>
        </button>
      </div>
    </div>
  );
};
