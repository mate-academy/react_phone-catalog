import React from 'react';
import styles from './ProductCard.module.scss';
import { useTheme } from '../../context/ThemeContext';
import { Product } from '../../types/Product';
import classNames from 'classnames';
import { getFavoritesIconSrc } from '../../servises/iconSrc';
import { useAppContext } from '../../context/AppContext';
import { Link } from 'react-router-dom';

type ProductCardProps = {
  product: Product;
  isHotPrice?: boolean;
};

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { image, name, fullPrice, price, screen, capacity, ram } = product;
  const {
    addToFavorites,
    removeFromFavorites,
    favorites,
    cart,
    addToCart,
    removeFromCart,
  } = useAppContext();
  const { theme } = useTheme();

  const isFavorite = favorites.some(favProduct => favProduct.id === product.id);

  const handleFavoriteClick = () => {
    if (isFavorite) {
      removeFromFavorites(product.id);
    } else {
      addToFavorites(product);
    }
  };

  const isProductInCart = cart.some(
    cartItem => cartItem.product.id === product.id,
  );

  const handleCartClick = () => {
    if (isProductInCart) {
      removeFromCart(product.id);
    } else {
      addToCart(product);
    }
  };

  const favoritesIconSrc = () => {
    if (isFavorite) {
      return './img/icons/SelectedToFaforitesIcon.svg';
    }

    return getFavoritesIconSrc(theme);
  };

  return (
    <div className={styles.ProductCard}>
      <Link
        to={`/products/${product.itemId}`}
        className={styles.imageContainer}
      >
        <img className={styles.image} src={image} alt="image" />
      </Link>

      <div className={styles.wrapper}>
        <div className={styles.title}>{name}</div>
        <div className={styles.price}>
          <div className={styles.existPrice}>${fullPrice}</div>
          <div className={classNames(styles.hotPrice, {})}>${price}</div>
        </div>
        <div className={styles.divider}></div>
        <div className={styles.description}>
          <div className={styles.existDescription}>
            <p className={styles.descriptionTitle}>Screen</p>
            <p className={styles.descriptionText}>{screen}</p>
          </div>
          <div className={styles.existDescription}>
            <p className={styles.descriptionTitle}>Capacity</p>
            <p className={styles.descriptionText}>{capacity}</p>
          </div>
          <div className={styles.existDescription}>
            <p className={styles.descriptionTitle}>RAM</p>
            <p className={styles.descriptionText}>{ram}</p>
          </div>
        </div>
        <div className={styles.buttons}>
          <button className={styles.buttonCard} onClick={handleCartClick}>
            <p className={styles.buttonText}>
              {isProductInCart ? 'Remove' : 'Add to cart'}
            </p>
          </button>
          <button
            className={styles.buttonFavorite}
            onClick={handleFavoriteClick}
          >
            <img
              className={styles.buttonFavoriteIcon}
              src={favoritesIconSrc()}
              alt="favorite"
            />
          </button>
        </div>
      </div>
    </div>
  );
};
