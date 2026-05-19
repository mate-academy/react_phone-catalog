import React from 'react';
import { Icon } from '../Icon';
import styles from './ProductCard.module.scss';
import { Product } from '../../types/ProductType';
// eslint-disable-next-line max-len
import { useCartAndFavContext } from '../../modules/shared/context/CartAndFavContext';
import { Link } from 'react-router-dom';

interface Props {
  product: Product;
  discount?: boolean;
}

export const ProductCard: React.FC<Props> = ({ product, discount }) => {
  const context = useCartAndFavContext();
  const { isFavorite, toggleFavorite, isCart, toggleCart } = context;

  return (
    <div className={styles.card}>
      <div className={styles.card__container}>
        <Link
          to={`/${product.category}/${product.itemId}`}
          className={styles.card__link}
        >
          <div className={styles.card__image}>
            <img
              className={styles.image}
              src={product.image}
              alt={product.name}
            />
          </div>
          <div className={styles.card__title}>{product.name}</div>
          <div className={styles.card__price}>
            <div className={styles.normal}>{`$${product.fullPrice}`}</div>
            {product.price && discount && (
              <div className={styles.discount}>{`$${product.price}`}</div>
            )}
          </div>
          <div className={styles.card__divider} />
          <div className={styles.card__info}>
            <div className={styles.screen}>
              <div className={styles.spec__name}>Screen</div>
              <div className={styles.spec__value}>{product.screen}</div>
            </div>
            <div className={styles.capacity}>
              <div className={styles.spec__name}>Capacity</div>
              <div className={styles.spec__value}>{product.capacity}</div>
            </div>
            <div className={styles.ram}>
              <div className={styles.spec__name}>RAM</div>
              <div className={styles.spec__value}>{product.ram}</div>
            </div>
          </div>
        </Link>
        <div className={styles.card__buttons}>
          <button
            className={`${styles.button_cart} ${isCart(product.itemId) && styles.button_cart__added}`}
            onClick={() => toggleCart(product.itemId)}
          >
            {isCart(product.itemId) ? 'Added' : 'Add to cart'}
          </button>
          <button
            className={styles.button_fovourite}
            onClick={() => toggleFavorite(product.itemId)}
          >
            <Icon
              name={
                isFavorite(product.itemId) ? 'favouritesfilled' : 'favourites'
              }
              className={styles.fovourite_icon}
            />
          </button>
        </div>
      </div>
    </div>
  );
};
