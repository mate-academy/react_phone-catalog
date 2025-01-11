/* eslint-disable */
import React from 'react';
import styles from './ProductCard.module.scss';
import classNames from 'classnames';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { addFavorite, deleteFavourite } from '../../features/favorites';

import { RootState } from '../../app/store';
import { Product } from '../../types/Product';
import { addToCart, deleteFromCart } from '../../features/cart';

type Props = {
  product: Product;
  showDiscount?: boolean;
};

export const ProductCard: React.FC<Props> = ({
  product,
  showDiscount = false,
}) => {
  const allProducts = useSelector((state: RootState) => state.favorites.items);
  const cartProducts = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();

  const handleAddFavorite = product => {
    dispatch(addFavorite(product));
  };

  const handleDeleteFavorite = () => {
    dispatch(deleteFavourite(product.itemId));
  };

  const handleAddToCart = (product: Product) => {
    dispatch(addToCart(product));
  };

  const handleDeleteFromCart = () => {
    dispatch(deleteFromCart(product.itemId));
  };

  return (
    <div className={styles['product-card']} key={product.id}>
      <div className={styles['product-card__details']}>
        <NavLink
          to={`/catalog/${product.category}/${product.itemId}`}
          className={styles['product-card__image-link']}
        >
          <img
            src={product.image}
            alt={product.name}
            className={styles['product-card__image']}
          />

          <p className={styles['product-card__name']}>{product.name}</p>
        </NavLink>
        <div className={styles['product-card__prices']}>
          <h3 className={styles['product-card__price']}>{product.price}$</h3>
          {showDiscount && (
            <h3 className={styles['product-card__fullPrice']}>
              {product.fullPrice}$
            </h3>
          )}
        </div>
      </div>
      <div className={styles['product-card__info']}>
        <ul className={styles['product-card__features']}>
          <li className={styles['product-card__feature']}>
            <span className={styles['product-card__feature-label']}>
              Screen:
            </span>
            <span className={styles['product-card__feature-value']}>
              {product.screen}
            </span>
          </li>

          <li className={styles['product-card__feature']}>
            <span className={styles['product-card__feature-label']}>
              Capacity:
            </span>
            <span className={styles['product-card__feature-value']}>
              {product.capacity}
            </span>
          </li>

          <li className={styles['product-card__feature']}>
            <span className={styles['product-card__feature-label']}>RAM:</span>
            <span className={styles['product-card__feature-value']}>
              {product.ram}
            </span>
          </li>
        </ul>
      </div>
      <div className={styles['product-card__buttons']}>
        {cartProducts.some(p => p.itemId === product.itemId) ? (
          <button
            onClick={() => handleDeleteFromCart()}
            className={classNames(
              styles['product-card__button'],
              styles['product-card__button--cart'],
              styles.button,
              styles['cart-active'],
            )}
          >
            Added to cart
          </button>
        ) : (
          <button
            onClick={() => handleAddToCart(product)}
            className={classNames(
              styles['product-card__button'],
              styles['product-card__button--cart'],
              styles.button,
            )}
          >
            Add to cart
          </button>
        )}

        {allProducts.some(p => p.itemId === product.itemId) ? (
          <button
            onClick={() => {
              handleDeleteFavorite();
            }}
            className={classNames(
              styles['product-card__button'],
              styles.favorites,
              styles.button,
            )}
          >
            <img
              src="src/Images/Favourites-Filled.svg"
              alt="Favorites"
              className={styles['favorites-img']}
            />
          </button>
        ) : (
          <button
            onClick={() => {
              handleAddFavorite(product);
            }}
            className={classNames(
              styles['product-card__button'],
              styles.favorites,
              styles.button,
              styles['is-active'],
            )}
          >
            <img
              src="src/Images/Favorites-icon.svg"
              alt="Favorites"
              className={styles['favorites-img']}
            />
          </button>
        )}
      </div>
    </div>
  );
};
