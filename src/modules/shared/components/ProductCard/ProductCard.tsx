import React from 'react';
import { NavLink } from 'react-router-dom';
import { Product } from '../../types/Product';
import styles from './ProductCard.module.scss';
import { useFavorites } from '../../context/FavoriteContext';
import { useCart } from '../../context/CartContext';
import { getPublicPath } from '../../utils/getPublicPath';

type Props = { product: Product };

export const ProductCard: React.FC<Props> = ({ product }) => {
  const { favorites, dispatch: favoritesDispatch } = useFavorites();
  const { cart, dispatch: cartDispatch } = useCart();

  const isFavorite = favorites.includes(product.itemId);

  const isInCart = cart.some(item => item.id === product.itemId);

  const handleLike = () => {
    favoritesDispatch({ type: 'TOGGLE_FAVORITE', payload: product.itemId });
  };

  const handleCartToggle = () => {
    if (isInCart) {
      cartDispatch({ type: 'REMOVE_PRODUCT', payload: product.itemId });
    } else {
      cartDispatch({ type: 'ADD_PRODUCT', payload: product.itemId });
    }
  };

  return (
    <div className={styles.productCard}>
      <NavLink
        to={`/product/${product.itemId}`}
        className={styles.productCardLink}
      >
        <img
          className={styles.productCardImage}
          src={`${getPublicPath(product.image)}`}
          alt={product.name}
        />
        <h3 className={styles.productCardName}>{product.name}</h3>
      </NavLink>

      <div className={styles.productCardContainer}>
        <span className={styles.productCardPrice}>${product.price}</span>
        {product.fullPrice > product.price && (
          <span className={styles.productCardFullPrice}>
            ${product.fullPrice}
          </span>
        )}
      </div>
      <div className={styles.productCardLine}></div>
      <div className={styles.productCardInfo}>
        <div className={styles.productCardContainer}>
          <h4 className={styles.productCardInfoText}>Screen</h4>
          <div className={styles.productCardInfoData}>{product.screen}</div>
        </div>
        <div className={styles.productCardContainer}>
          <h4 className={styles.productCardInfoText}>Capacity</h4>
          <div className={styles.productCardInfoData}>{product.capacity}</div>
        </div>
        <div className={styles.productCardContainer}>
          <h4 className={styles.productCardInfoText}>RAM</h4>
          <div className={styles.productCardInfoData}>{product.ram}</div>
        </div>
      </div>

      <div className={styles.productCardContainer}>
        <button
          type="button"
          className={`${styles.productCardCart} ${
            isInCart ? styles.productCardCartAdded : ''
          }`}
          onClick={handleCartToggle}
          disabled={isInCart}
        >
          {isInCart ? 'Added to cart' : 'Add to cart'}
        </button>

        <button
          type="button"
          className={`${styles.productCardFav} ${
            isFavorite ? styles.isLiked : ''
          }`}
          onClick={handleLike}
        >
          <span className={styles.particle} />
          <span className={styles.particle} />
          <span className={styles.particle} />
          <span className={styles.particle} />
          <span className={styles.particle} />
          <span className={styles.particle} />
          <span className={styles.particle} />
          <span className={styles.particle} />

          <svg className={styles.productCardFavImg} viewBox="0 0 24 24">
            {/*eslint-disable-next-line max-len */}
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </button>
      </div>
    </div>
  );
};
