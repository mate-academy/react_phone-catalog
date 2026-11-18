import React from 'react';
import { FaRegHeart, FaHeart } from 'react-icons/fa';
import { Link } from 'react-router-dom';

import { useCart } from '../../hooks/useCartContext';
import { useFavorite } from '../../hooks/useFavoriteContext';

import { Product } from '../../types/Product';

import styles from './ProductCard.module.scss';
import classNames from 'classnames';

type Props = {
  product: Product;
};

type Specs = {
  label: string;
  value: string;
};

export const ProductCard: React.FC<Props> = ({ product }) => {
  const { cart, dispatch: cartDispatch } = useCart();
  const { favorite, dispatch: favoriteDispath } = useFavorite();

  const isInCart = cart.some(isCart => isCart.id === product.id) ?? null;
  const isInFavorite =
    favorite.some(isFavorite => isFavorite.id === product.id) ?? null;

  const specs: Specs[] = [
    {
      label: 'Screen',
      value: product.screen,
    },
    {
      label: 'Capacity',
      value: product.capacity,
    },
    {
      label: 'RAM',
      value: product.ram,
    },
  ];

  return (
    <article className={styles['product-card']}>
      <Link
        to={`/${product.category}/${product.itemId}`}
        className={styles['product-card__link']}
      >
        <div className={styles['product-card__picture']}>
          <img
            src={`${import.meta.env.BASE_URL}${product.image}`}
            alt={product.name}
            className={styles['product-card__image']}
          />
        </div>
      </Link>

      <div className={styles['product-card__meta']}>
        <h4 className={styles['product-card__title']}>{product.name}</h4>

        <div className={styles['product-card__price']}>
          <span className={styles['product-card__new-price']}>
            <b>${product.price}</b>
          </span>
          <span className={styles['product-card__old-price']}>
            ${product.fullPrice}
          </span>
        </div>

        <hr className={styles['product-card__line']} />

        <div className={styles['product-card__rows']}>
          {specs.map(spec => (
            <div key={spec.label} className={styles['product-card__row']}>
              <span className={styles['product-card__row-left']}>
                {spec.label}
              </span>
              <span className={styles['product-card__row-right']}>
                {spec.value}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className={styles['product-card__controller']}>
        <button
          className={classNames(styles['product-card__button-accept'], {
            [styles['product-card__button-accept--selected']]: isInCart,
          })}
          onClick={() => cartDispatch({ type: 'add', payload: product })}
          disabled={isInCart}
        >
          {isInCart ? 'Added to cart' : 'Add to cart'}
        </button>
        <button
          className={classNames(styles['product-card__button-favorite'], {
            [styles['product-card__button-favorite--selected']]: isInFavorite,
          })}
          onClick={() => favoriteDispath({ type: 'toggle', payload: product })}
        >
          {isInFavorite ? (
            <FaHeart className={styles['product-card__icon-heart']} />
          ) : (
            <FaRegHeart className={styles['product-card__icon-heart']} />
          )}
        </button>
      </div>
    </article>
  );
};
