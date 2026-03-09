import React from 'react';
import styles from './ProductCard.module.scss';
import classname from 'classnames';
import { Product } from '../../../../types/Product';
import { Link } from 'react-router-dom';
import { useFavorites } from '../../context/FavoritesContext';
import { useCart } from '../../context/CartContext';

type Props = {
  product: Product;
};

export const ProductCard: React.FC<Props> = ({ product }) => {
  const { addToFavorites, removeFromFavorites, isFavorite } = useFavorites();
  const { addToCart, cart } = useCart();

  const isFav = isFavorite(product);
  const isInCart = cart.some(item => item.id === product.id);

  const handleFavoriteClick = () => {
    if (isFav) {
      removeFromFavorites(product);
    } else {
      addToFavorites(product);
    }
  };

  const handleCartClick = () => {
    if (!isInCart) {
      addToCart(product);
    }
  };

  return (
    <div className={styles.card}>
      <div className={styles.imageWrapper}>
        <Link to={`/product/${product.itemId}`}>
          <img
            src={product.image}
            alt={product.name}
            className={styles.image}
          />
        </Link>
      </div>

      <div className={styles.info}>
        <Link to={`/product/${product.itemId}`}>
          <h3 className={styles.title}>{product.name}</h3>
        </Link>

        <div className={styles.priceContainer}>
          <span className={styles.price}>${product.price}</span>
          <span className={styles.fullPrice}>${product.fullPrice}</span>
        </div>

        <div className={styles.divider} />

        <div className={styles.specs}>
          <div className={styles.spec}>
            <span>Screen</span>
            <span>{product.screen}</span>
          </div>
          <div className={styles.spec}>
            <span>Capacity</span>
            <span>{product.capacity}</span>
          </div>
          <div className={styles.spec}>
            <span>RAM</span>
            <span>{product.ram}</span>
          </div>
        </div>

        <div className={styles.actions}>
          <button
            className={classname(styles.addToCart, {
              [styles.added]: isInCart,
            })}
            onClick={handleCartClick}
          >
            {isInCart ? `Added to cart` : `Add to cart`}
          </button>
          <button
            className={classname(styles.addToFavorite, {
              [styles.isFavorite]: isFav,
            })}
            onClick={handleFavoriteClick}
          >
            {isFav ? (
              <img src="img/icons/FavoriteFilled.png" alt="FavoriteFilled" />
            ) : (
              <img src="img/icons/Favorites.png" alt="FavoriteOutlined" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
