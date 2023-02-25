import classNames from 'classnames';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { addItem, removeItem } from '../../redux/slices/cartSlice';
import {
  addItemToFavorite,
  removeItemFromFavorite,
} from '../../redux/slices/favoriteSlice';
import { RootState } from '../../redux/store';
import { Product } from '../../types/Product';
import './card.scss';

type PropTypes = {
  product: Product
};

export const Card: React.FC<PropTypes> = ({ product }) => {
  const {
    name,
    price,
    fullPrice,
    screen,
    capacity,
    ram,
    image,
    id,
    phoneId,
    category,
    itemId,
  } = product;

  const dispatch = useDispatch();
  const location = useLocation();
  const items = useSelector((state: RootState) => state.cart.items);
  const itemsInFavorite
    = useSelector((state: RootState) => state.favorite.itemInFavorite);
  const isProductInCart = items.some(item => item.id === product.id);
  const isProductInFavorite
    = itemsInFavorite.some(item => item.id === product.id);

  const handleClick
    = (e: React.MouseEvent<HTMLButtonElement>, type: string) => {
      e.stopPropagation();

      const itemForCart = {
        phoneId,
        name,
        price,
        image,
        id,
        category,
        itemId,
        quantity: 1,
      };

      switch (type) {
        case 'cart':
          if (isProductInCart) {
            dispatch(removeItem(product.id));
          } else {
            dispatch(addItem(itemForCart));
          }

          break;

        case 'favorite':
          if (isProductInFavorite) {
            dispatch(removeItemFromFavorite(product.id));
          } else {
            dispatch(addItemToFavorite(product));
          }

          break;

        default:
          break;
      }
    };

  return (
    <li className="card">
      <div className="card__img-box">
        <Link
          to={{
            pathname: `/${product.category}/${product.itemId}`,
            search: location.search,
          }}
        >
          <img
            alt="product"
            className="card__img"
            src={image}
          />
        </Link>
      </div>
      <p className="card__name">
        <a href="/">
          {name}
        </a>
      </p>
      <div className="card__price">
        <h2 className="card__price-amount">
          {`$${price}`}
        </h2>
        <p className="card__price-amount--old">
          {`$${fullPrice}`}
        </p>
      </div>
      <div className="card__desc">
        <div className="card__box-left">
          <p className="card__desc-title">Screen</p>
          <p className="card__desc-title">Capacity</p>
          <p className="card__desc-title">RAM</p>
        </div>
        <div className="card__box-right">
          <p className="card__desc-char">{screen}</p>
          <p className="card__desc-char">{capacity}</p>
          <p className="card__desc-char">{ram}</p>
        </div>
      </div>
      <div className="card__box-button">
        <button
          onClick={(e) => handleClick(e, 'cart')}
          type="button"
          className={classNames(
            'card__button',
            {
              'card__button--active': isProductInCart,
            },
          )}
        >
          {isProductInCart ? 'Added to cart' : 'Add to cart'}
        </button>
        <button
          type="button"
          onClick={(e) => handleClick(e, 'favorite')}
          className={classNames(
            'card__button-heart',
            {
              'card__button-heart--active': isProductInFavorite,
            },
          )}
        >
          <div
            className={classNames(
              'card__button-img',
              {
                'card__button-img--active': isProductInFavorite,
              },
            )}
          />
        </button>
      </div>
    </li>
  );
};
