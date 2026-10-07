import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../../types/Product';
import { useCart } from '../../context/CartContext';
import { useFavorites } from '../../context/FavoritesContext';

import styles from './ProductCard.module.scss';

import classNames from 'classnames';

type Props = {
  product: Product;
  showFullPrice?: boolean;
  fullWidth?: boolean;
};

export const ProductCard: React.FC<Props> = ({
  product,
  showFullPrice,
  fullWidth,
}) => {
  const { name, price, fullPrice, screen, capacity, ram, itemId, id } = product;
  const { cart, addToCart, removeFromCart } = useCart();
  const isInCart = cart.some(item => item.id === id);

  const handleCartClick = () => {
    if (isInCart) {
      return removeFromCart(id);
    }

    addToCart(product);
  };

  const { favorites, toggleFavorite } = useFavorites();
  const isFavorite = favorites.includes(id);

  //scale images of specific products according to the layout requirements
  const getProductImageStyle = (productName: string) => {
    if (productName.includes('Apple iPad Mini (6th Gen) 64GB Starlight')) {
      return { transform: 'scale(1.3)' };
    }

    if (productName.includes('Apple iPad Mini (6th Gen) 256GB Starlight')) {
      return { transform: 'scale(1.3)' };
    }

    if (productName.includes('Apple iPad Mini (5th Gen)')) {
      return { transform: 'scale(1.5)' };
    }

    if (productName.includes('Apple iPhone 14 Pro')) {
      return { transform: 'scale(1.2)' };
    }

    if (productName.includes('Apple iPad Pro 11')) {
      return { transform: 'scale(1.1)' };
    }

    if (productName.includes('Apple iPad Mini')) {
      return { transform: 'scale(1.6)' };
    }

    return undefined;
  };

  return (
    <div
      className={classNames(styles.card, {
        [styles.cardFullWidth]: fullWidth,
      })}
    >
      <Link to={`/product/${itemId}`} className={styles.card__imageContainer}>
        <img
          src={`/${product.image}`}
          alt={product.name}
          className={styles.card__image}
          style={getProductImageStyle(product.name)}
        />
      </Link>

      <Link to={`/product/${itemId}`} className={styles.card__title}>
        {name}
      </Link>

      <div className={styles.card__priceBlock}>
        <span className={styles.card__price}>${price}</span>
        {showFullPrice && price < fullPrice && (
          <span className={styles.card__fullPrice}>${fullPrice}</span>
        )}
      </div>

      <div className={styles.card__divider} />

      <div className={styles.card__specs}>
        <div className={styles.card__specRow}>
          <span className={styles.card__specLabel}>Screen</span>
          <span className={styles.card__specValue}>{screen}</span>
        </div>
        <div className={styles.card__specRow}>
          <span className={styles.card__specLabel}>Capacity</span>
          <span className={styles.card__specValue}>{capacity}</span>
        </div>
        <div className={styles.card__specRow}>
          <span className={styles.card__specLabel}>RAM</span>
          <span className={styles.card__specValue}>{ram}</span>
        </div>
      </div>

      <div className={styles.card__actions}>
        <button
          type="button"
          className={classNames(styles.card__btnCart, {
            [styles['card__btnCart--added']]: isInCart,
          })}
          onClick={handleCartClick}
        >
          {isInCart ? 'Added to cart' : 'Add to cart'}
        </button>
        <button
          type="button"
          className={classNames(styles.card__btnFavorite, {
            [styles['card__btnFavorite--active']]: isFavorite,
          })}
          onClick={() => toggleFavorite(id)}
        >
          <img
            src={
              isFavorite ? '/img/icons/like-active.svg' : '/img/icons/like.svg'
            }
            alt="Like"
          />
        </button>
      </div>
    </div>
  );
};
