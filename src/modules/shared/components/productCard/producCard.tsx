import React from 'react';
import styles from './productCard.module.scss';
import { CardProps } from './productCard.types';
import classNames from 'classnames';
import { NavLink } from 'react-router-dom';
import { scrolToTop } from '../../../../utils/scroltotop/scrol';
import { useCart } from '../../../../utils/Cartcontext/cartcontext';

export const ProductCard: React.FC<CardProps> = ({
  product,
  onCatalogPage,
  discount,
  onFavoPage,
}) => {
  const { addToCart, cart, addToFavo, favoList } = useCart();
  const isAdded = cart.some(p => p.itemId === product.itemId);
  const isFavo = favoList.some(p => p.itemId === product.itemId);

  return (
    <div
      className={classNames(styles.card, {
        [styles['card--catalog']]: onCatalogPage,
        [styles['card--favorites']]: onFavoPage,
      })}
    >
      <NavLink
        onClick={scrolToTop}
        to={`/${product.category}/${product.itemId}`}
      >
        <img
          className={classNames(styles['card__product-image'], {
            [styles['card__product-image--catalog']]: onCatalogPage,
            [styles['card__product-image--favorites']]: onFavoPage,
          })}
          src={product.image}
          alt="iphone"
        />
      </NavLink>
      <NavLink
        onClick={scrolToTop}
        className={styles['card__product-link']}
        to={`/${product.category}/${product.itemId}`}
      >
        <h2 className={styles['card__product-title']}>{`${product.name}`}</h2>
      </NavLink>
      <div className={styles['card__product-price-container']}>
        {(onCatalogPage || discount) && (
          <p className={styles['card__product-price']}>{`$${product.price}`}</p>
        )}
        <p
          className={classNames(styles['card__product-price'], {
            [styles['card__product-price-discount']]: onCatalogPage || discount,
          })}
        >{`$${product.fullPrice}`}</p>
      </div>
      <div className={styles['card__product-content']}>
        <div className={styles['card__product-info-content']}>
          <p className={styles['card__product-info']}>Screen</p>
          <p className={styles['card__product-info']}>Capacity </p>
          <p className={styles['card__product-info']}>RAM </p>
        </div>
        <div
          className={`${styles['card__product-info-content']} ${styles['card__product-info-content--flex-end']}`}
        >
          <p className={styles['card__product-info']}> {product.screen}</p>
          <p className={styles['card__product-info']}> {product.capacity}</p>
          <p className={styles['card__product-info']}>{product.ram}</p>
        </div>
      </div>
      <div className={styles['card__button-container']}>
        <button
          onClick={() => addToCart(product)}
          className={classNames(styles.card__button, {
            [styles['card__button--catalog']]: onCatalogPage,
            [styles['card__button--active']]: isAdded,
            [styles['card__button--favorites']]: onFavoPage,
          })}
        >
          {isAdded ? 'Added to cart' : 'Add to cart'}
        </button>
        <button
          onClick={() => addToFavo(product)}
          className={classNames(styles['card__button-heart'])}
        >
          <svg
            viewBox="0 0 24 24"
            className={classNames(styles['card__image-heart'], {
              [styles['card__image-heart--active']]: isFavo,
            })}
          >
            <path
              d={`M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3
              16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z`}
            />
          </svg>
        </button>
      </div>
    </div>
  );
};
