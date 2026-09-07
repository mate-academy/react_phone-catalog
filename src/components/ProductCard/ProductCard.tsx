import React from 'react';
import styles from './ProductCard.module.scss';
import { Product } from '../../shared/types/Product';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { useGlobalState } from '../../shared/constants/GlobalContext';

type Props = {
  product: Product;
  className?: string;
};

export const ProductCard: React.FC<Props> = ({ product, className }) => {
  const productLink = `/${product.category}/${product.itemId}`;
  const { state, dispatch } = useGlobalState();

  const handleAddToCart = () => {
    if (state.cart.some(cart => cart.itemId === product.itemId)) {
      dispatch({ type: 'REMOVE_FROM_CART', payload: product });
    } else {
      dispatch({ type: 'ADD_TO_CART', payload: product });
    }
  };

  const handleAddToFavorites = () => {
    if (state.favorites.some(favorite => favorite.itemId === product.itemId)) {
      dispatch({ type: 'REMOVE_FROM_FAVORITES', payload: product });
    } else {
      dispatch({ type: 'ADD_TO_FAVORITES', payload: product });
    }
  };

  return (
    <div className={classNames(styles.ProductCard, className)}>
      <Link to={productLink} className={styles.ProductCard__imageWrapper}>
        <img
          src={product.image}
          alt={product.name}
          className={styles.ProductCard__image}
        />
      </Link>

      <p className={styles.ProductCard__name}>{product.name}</p>
      <div className={styles.ProductCard__prices}>
        <h3 className={styles.ProductCard__price}>{`$${product.price}`}</h3>
        {product.fullPrice !== product.price && (
          <div className={styles.ProductCard__fullPrice}>
            <h3
              className={styles.ProductCard__fullPriceText}
            >{`$${product.fullPrice}`}</h3>
          </div>
        )}
      </div>
      <div className={styles.ProductCard__underline}></div>
      <div className={styles.ProductCard__description}>
        <div className={styles.ProductCard__descriptionBlock}>
          <p className={styles.ProductCard__key}>Screen</p>{' '}
          <p className={styles.ProductCard__value}>{product.screen}</p>
        </div>
        <div className={styles.ProductCard__descriptionBlock}>
          <p className={styles.ProductCard__key}>Capacity</p>{' '}
          <p className={styles.ProductCard__value}>{product.capacity}</p>
        </div>
        <div className={styles.ProductCard__descriptionBlock}>
          <p className={styles.ProductCard__key}>RAM</p>{' '}
          <p className={styles.ProductCard__value}>{product.ram}</p>
        </div>
      </div>
      <div className={styles.ProductCard__bottomButtons}>
        <button
          onClick={handleAddToCart}
          className={classNames(
            styles.ProductCard__addCart,
            state.cart.some(cart => cart.itemId === product.itemId) &&
              styles.ProductCard__addCartSelected,
          )}
        >
          {state.cart.some(cart => cart.itemId === product.itemId)
            ? 'Added to cart'
            : 'Add to cart'}
        </button>
        <button
          onClick={handleAddToFavorites}
          className={classNames(
            styles.ProductCard__addFavorite,
            state.favorites.some(
              favorite => favorite.itemId === product.itemId,
            ) && styles.ProductCard__addFavoriteSelected,
          )}
        ></button>
      </div>
    </div>
  );
};
