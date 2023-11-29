/* eslint-disable max-len */
import classNames from 'classnames';
import { FC, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { addCartItem, removeCartItem } from '../../features/cartSlice';
import { addFavoriteProduct, removeFavoriteProduct } from '../../features/favoritesSlice';
import { Product } from '../../types/Product';

import './ProductCard.scss';

type Props = {
  product: Product;
};

export const ProductCard: FC<Props> = ({ product }) => {
  const dispatch = useAppDispatch();
  const { favorites } = useAppSelector(state => state.favorites);
  const { cart } = useAppSelector(state => state.cart);

  const isFavorite = useMemo(() => {
    return favorites.some(item => item.id === product.id);
  }, [favorites]);

  const isCart = useMemo(() => {
    return cart.some(item => item.id === product.id);
  }, [cart]);

  const addToFavorites = () => {
    if (!isFavorite) {
      dispatch(addFavoriteProduct(product));
    } else {
      dispatch(removeFavoriteProduct(product));
    }
  };

  const addToCart = () => {
    const item = {
      id: product?.id,
      title: product?.name,
      imageUrl: product?.imageUrl,
      price: product.price * ((100 - product.discount) / 100),
      color: 'Beige',
      capacity: 64,
      quantity: 1,
    };

    if (!isCart) {
      dispatch(addCartItem(item));
    } else {
      dispatch(removeCartItem(item));
    }
  };

  const {
    imageUrl,
    name,
    price,
    discount,
    screen,
    capacity,
    ram,
    id,
  } = product;

  return (
    <div className="card" data-cy="cardsContainer">
      <Link to={`/phones/${id}`} className="card__link">
        <img src={`${imageUrl}`} alt={name} className="card__img" />
        <h2 className="card__title">{name}</h2>

        <div className="card__price">
          {discount === 0 ? (
            <p className="card__price-regular">{`$${price}`}</p>
          ) : (
            <>
              <p className="card__price-regular">
                {`$${
                  price * ((100 - discount) / 100)
                }`}

              </p>
              <p className="card__price-discount">{`$${price}`}</p>
            </>
          )}
        </div>

        <div className="card__specs-container">
          <div className="card__specs">
            <p className="card__specs-title">Screen</p>
            <p className="card__specs-value">{screen}</p>
          </div>
          <div className="card__specs">
            <p className="card__specs-title">Capacity</p>
            <p className="card__specs-value">{capacity}</p>
          </div>
          <div className="card__specs">
            <p className="card__specs-title">RAM</p>
            <p className="card__specs-value">{ram}</p>
          </div>
        </div>
      </Link>

      <div className="card__buttons">
        <button
          type="button"
          data-cy="addToCart"
          className={classNames('add-to-cart', { 'add-to-cart--active': isCart })}
          onClick={addToCart}
        >
          {isCart ? 'Added to cart' : 'Add to cart'}
        </button>
        <button
          type="button"
          data-cy="addToFavorite"
          className={classNames('favorites', { 'favorites--active': isFavorite })}
          onClick={addToFavorites}
        >
          <span
            className={classNames('icon', {
              'icon--favorites': !isFavorite,
              'icon--favorites--red': isFavorite,
            })}
          />
        </button>
      </div>
    </div>
  );
};
