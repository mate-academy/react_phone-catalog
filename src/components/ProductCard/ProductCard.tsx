import React from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { Product } from '../../types';
import { useCart } from '../../contexts/CartContext';
import { useFavorites } from '../../contexts/FavoritesContext';
import styles from './ProductCard.module.scss';

interface ProductCardProps {
  product: Product;
  className?: string;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  className,
}) => {
  const { state: cartState, dispatch: cartDispatch } = useCart();
  const { state: favoritesState, dispatch: favoritesDispatch } = useFavorites();

  const isInCart = cartState.items.some(item => item.product.id === product.id);
  const isInFavorites = favoritesState.items.some(
    item => item.product.id === product.id,
  );

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!isInCart) {
      cartDispatch({ type: 'ADD_ITEM', payload: product });
    }
  };

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (isInFavorites) {
      const favoriteItem = favoritesState.items.find(
        item => item.product.id === product.id,
      );

      if (favoriteItem) {
        favoritesDispatch({
          type: 'REMOVE_FAVORITE',
          payload: favoriteItem.id,
        });
      }
    } else {
      favoritesDispatch({ type: 'ADD_FAVORITE', payload: product });
    }
  };

  const discount = product.fullPrice - product.price;
  const discountPercentage = Math.round((discount / product.fullPrice) * 100);

  return (
    <div className={classNames(styles.productCard, className)}>
      <Link to={`/product/${product.id}`} className={styles.productCard__link}>
        {/* Product Image */}
        <div className={styles.productCard__imageContainer}>
          <img
            src={`/${product.image}`}
            alt={product.name}
            className={styles.productCard__image}
          />

          {/* Discount Badge */}
          {discount > 0 && (
            <div className={styles.productCard__discount}>
              -{discountPercentage}%
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className={styles.productCard__info}>
          <h3 className={styles.productCard__title}>{product.name}</h3>

          {/* Prices */}
          <div className={styles.productCard__prices}>
            <span className={styles.productCard__price}>${product.price}</span>
            {discount > 0 && (
              <span className={styles.productCard__fullPrice}>
                ${product.fullPrice}
              </span>
            )}
          </div>

          {/* Specifications */}
          <div className={styles.productCard__specs}>
            <div className={styles.productCard__spec}>
              <span className={styles.productCard__specName}>Screen</span>
              <span className={styles.productCard__specValue}>
                {product.screen}
              </span>
            </div>
            <div className={styles.productCard__spec}>
              <span className={styles.productCard__specName}>Capacity</span>
              <span className={styles.productCard__specValue}>
                {product.capacity}
              </span>
            </div>
            <div className={styles.productCard__spec}>
              <span className={styles.productCard__specName}>RAM</span>
              <span className={styles.productCard__specValue}>
                {product.ram}
              </span>
            </div>
          </div>

          {/* Actions */}
          <div className={styles.productCard__actions}>
            <button
              className={classNames(styles.productCard__cartBtn, {
                [styles.productCard__cartBtn_added]: isInCart,
              })}
              onClick={handleAddToCart}
            >
              {isInCart ? 'Added to cart' : 'Add to cart'}
            </button>

            <button
              className={classNames(styles.productCard__favoriteBtn, {
                [styles.productCard__favoriteBtn_active]: isInFavorites,
              })}
              onClick={handleToggleFavorite}
              aria-label={
                isInFavorites ? 'Remove from favorites' : 'Add to favorites'
              }
            >
              <img
                src={
                  isInFavorites
                    ? '/img/icons/heart-filled.svg'
                    : '/img/icons/heart.svg'
                }
                alt="Favorite"
                className={styles.productCard__favoriteIcon}
              />
            </button>
          </div>
        </div>
      </Link>
    </div>
  );
};
