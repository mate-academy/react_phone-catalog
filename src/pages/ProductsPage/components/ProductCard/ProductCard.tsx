import React from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { useStateContext } from '../../../../state/state';
import { Product } from '../../../../types';
import { Pages } from '../../../../enums';
import {
  AddToCartButton,
  AddToFavButton,
  HeartIcon,
  HeartFilledIcon,
} from '../../../../components';
import '../../../../styles/_typography.scss';
import './ProductCard.scss';

type Props = {
  product: Product;
  page?: Pages;
};

export const ProductCard: React.FC<Props> = ({ product, page }) => {
  const {
    itemId,
    image,
    name,
    price,
    fullPrice,
    screen,
    capacity,
    ram,
    category,
  } = product;

  const { state } = useStateContext();
  const isInCart = state.cart.find(item => item.itemId === product.itemId);
  const isFavourite = state.favourites.find(
    fav => fav.itemId === product.itemId,
  );

  return (
    <li
      className={classNames('card', `card--${page}`, {
        'product-slider__item': page === 'HomePage',
      })}
    >
      <Link to={`/${category}/${itemId}`} className="card__image-wrapper">
        <img src={image} alt={name} className="card__image" />
      </Link>
      <Link
        to={`/${category}/${itemId}`}
        className="card__title typography__body"
      >
        {name}
      </Link>
      <div className="card__price">
        <span className="card__price--price typography__h3">{`$${price}`}</span>
        {page === Pages.ProductsPage && (
          <span className="card__price--full-price typography__h3">
            ${fullPrice}
          </span>
        )}
      </div>

      <div className="card__devider"></div>

      <ul className="card__specs">
        <li className="card__specs-item typography__small-text">
          <span className="card__specs-label">Screen</span>
          <span className="card__specs-value">{screen}</span>
        </li>
        <li className="card__specs-item typography__small-text">
          <span className="card__specs-label">Capacity</span>
          <span className="card__specs-value">{capacity}</span>
        </li>
        <li className="card__specs-item typography__small-text">
          <span className="card__specs-label">Ram</span>
          <span className="card__specs-value">{ram}</span>
        </li>
      </ul>
      <div className="card__buttons">
        <AddToCartButton product={product} isInCart={!!isInCart}>
          {isInCart ? 'Added to cart' : 'Add to cart'}
        </AddToCartButton>
        <AddToFavButton product={product} isFavourite={!!isFavourite}>
          {isFavourite ? <HeartFilledIcon /> : <HeartIcon />}
        </AddToFavButton>
      </div>
    </li>
  );
};
