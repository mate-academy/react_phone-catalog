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
  showDiscountBadge?: boolean;
  showHotPriceText?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  className,
  showDiscountBadge = true,
  showHotPriceText = false,
}) => {
  const { state: cartState, dispatch: cartDispatch } = useCart();
  const { state: favoritesState, dispatch: favoritesDispatch } = useFavorites();

  const cartItem = cartState.items.find(item => item.product.id === product.id);
  const isInCart = !!cartItem;
  const isInFavorites = favoritesState.items.some(
    item => item.product.id === product.id,
  );

  const handleToggleCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (isInCart && cartItem) {
      //remove
      cartDispatch({
        type: 'REMOVE_ITEM',
        payload: cartItem.id,
      });
    } else {
      cartDispatch({
        type: 'ADD_ITEM',
        payload: product,
      });
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
      favoritesDispatch({
        type: 'ADD_FAVORITE',
        payload: product,
      });
    }
  };

  const discount = product.fullPrice - product.price;
  const shouldShowFullPrice = showDiscountBadge && discount > 0;

  return (
    <div className={classNames(styles.productCard, className)}>
      <Link
        to={`/product/${product.itemId}`}
        state={shouldShowFullPrice}
        className={styles.productCard__link}
      >
        {/* Product Image */}
        <div className={styles.productCard__imageContainer}>
          <img
            src={product.image}
            alt={product.name}
            className={styles.productCard__image}
          />
        </div>

        {/* Product Info */}
        <div className={styles.productCard__info}>
          <h3 className={styles.productCard__title}>{product.name}</h3>

          {/* Hot Price Label */}
          {showHotPriceText && (
            <p className={styles.productCard__hotPriceLabel}>HOT PRICE</p>
          )}

          {/* Prices */}
          <div className={styles.productCard__prices}>
            <span className={styles.productCard__price}>${product.price}</span>
            {shouldShowFullPrice && (
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
              onClick={handleToggleCart}
            >
              {isInCart ? 'Remove from cart' : 'Add to cart'}
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
                    ? 'img/icons/icon-red-heart.png'
                    : 'img/icons/heart.png'
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
