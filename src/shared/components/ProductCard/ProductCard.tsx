import React, { MouseEvent } from 'react';
import styles from './ProductCard.module.scss';
import { Product } from '../../types/Product';
import { useFavorites } from '../../hooks/useFavorites';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { useCart } from '../../../modules/CartPage/CartContext';
import toast from 'react-hot-toast';

interface ProductCardProps {
  product: Product;
  hideFullPrice?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  hideFullPrice,
}) => {
  const { image, name, price, fullPrice, screen, capacity, ram, isImposter } =
    product;
  const { favorites, toggleFavorite } = useFavorites();
  const { cart, addToCart, removeFromCart } = useCart();

  const isFavorite = favorites.some(item => item.id === product.id);
  const isInCart = cart.some(item => item.product.id === product.id);

  const handleClick = (event: MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
  };

  const handleCartClick = (event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();

    if (isInCart) {
      removeFromCart(product.id);
    } else {
      addToCart(product);
    }
  };

  const handleCardClick = (event: MouseEvent<HTMLAnchorElement>) => {
    if (isImposter) {
      event.preventDefault();

      const sound = new Audio(
        `${import.meta.env.BASE_URL}img/phones/among-us.mp3`,
      );

      sound.volume = 0.5;

      sound.play().catch(() => {});

      toast('Emergency Meeting! Imposter detected', {
        icon: 'ඞ',
        className: 'custom-toast imposter-toast',
      });
    }
  };

  return (
    <Link
      to={`/product/${product.itemId}`}
      onClick={handleCardClick}
      className={classNames({ [styles.imposterLink]: isImposter })}
    >
      <article
        className={classNames(styles.card, {
          [styles.imposterCard]: isImposter,
        })}
      >
        <div className={styles.imageWrapper}>
          <img
            src={`${import.meta.env.BASE_URL}${image}`}
            alt={name}
            className={styles.image}
          />
        </div>

        <h3 className={styles.title}>{name}</h3>

        <div className={styles.prices}>
          <span className={styles.price}>${price}</span>
          {!hideFullPrice && fullPrice && (
            <span className={styles.fullPrice}>${fullPrice}</span>
          )}
        </div>
        <hr className={styles.divider} />

        <div className={styles.specs}>
          <div className={styles.specItem}>
            <span className={styles.specName}>Screen:</span>
            <span className={styles.specValue}>{screen}</span>
          </div>

          <div className={styles.specItem}>
            <span className={styles.specName}>Capacity:</span>
            <span className={styles.specValue}>{capacity}</span>
          </div>

          <div className={styles.specItem}>
            <span className={styles.specName}>RAM:</span>
            <span className={styles.specValue}>{ram}</span>
          </div>
        </div>

        <div className={styles.buttons} onClick={handleClick}>
          <button
            type="button"
            className={classNames(styles.addToCartBtn, {
              [styles.added]: isInCart,
            })}
            onClick={handleCartClick}
          >
            {isInCart ? (
              <>
                <span className={styles.textAdded}>Added to cart</span>
                <span className={styles.textRemove}>Remove from cart</span>
              </>
            ) : (
              'Add to cart'
            )}
          </button>
          <button
            type="button"
            className={classNames(styles.favoritesBtn, {
              [styles.active]: isFavorite,
            })}
            onClick={() => toggleFavorite(product)}
          >
            <span className={styles.favoritesIcon} aria-label="Favorites" />
          </button>
        </div>
      </article>
    </Link>
  );
};
