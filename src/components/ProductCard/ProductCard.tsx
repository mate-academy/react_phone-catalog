import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../../types/Product';
import { useCart } from '../../context/CartContext/CartContext';
import { useFavorites } from '../../context/FavoritesContext/FavoritesContext';
import styles from './ProductCard.module.scss';

interface Props {
  product: Product;
}

export const ProductCard: React.FC<Props> = ({ product }) => {
  const { addToCart, isInCart } = useCart();
  const { toggleFavorite, isFavorite } = useFavorites();

  const { itemId, name, fullPrice, price, screen, capacity, ram, image } =
    product;

  const inCart = isInCart(itemId);
  const favorite = isFavorite(itemId);

  const handleCartClick = () => {
    if (!inCart) {
      addToCart(product);
    }
  };

  const handleFavoriteClick = () => {
    toggleFavorite(product);
  };

  return (
    <div className={styles.card}>
      {/* Картинка із посиланням на деталі */}
      <Link to={`/product/${itemId}`} className={styles.imageLink}>
        <img src={`/${image}`} alt={name} className={styles.image} />
      </Link>

      {/* Назва товару із посиланням */}
      <Link to={`/product/${itemId}`} className={styles.title}>
        {name}
      </Link>

      {/* Блок цін */}
      <div className={styles.prices}>
        <span className={styles.price}>${price}</span>
        {fullPrice > price && (
          <span className={styles.fullPrice}>${fullPrice}</span>
        )}
      </div>

      <div className={styles.divider} />

      {/* Характеристики */}
      <div className={styles.specs}>
        <div className={styles.specRow}>
          <span className={styles.specLabel}>Screen</span>
          <span className={styles.specValue}>{screen}</span>
        </div>
        <div className={styles.specRow}>
          <span className={styles.specLabel}>Capacity</span>
          <span className={styles.specValue}>{capacity}</span>
        </div>
        <div className={styles.specRow}>
          <span className={styles.specLabel}>RAM</span>
          <span className={styles.specValue}>{ram}</span>
        </div>
      </div>

      {/* Кнопки дій */}
      <div className={styles.actions}>
        <button
          type="button"
          onClick={handleCartClick}
          className={`${styles.cartBtn} ${inCart ? styles.inCart : ''}`}
        >
          {inCart ? 'Added' : 'Add to cart'}
        </button>

        <button
          type="button"
          onClick={handleFavoriteClick}
          className={`${styles.favBtn} ${favorite ? styles.isFavorite : ''}`}
          aria-label="Add to favorites"
        >
          <img
            src={
              favorite ? './img/icons/heart-filled.svg' : './img/icons/heart.svg'
            }
            alt="Favorite"
          />
        </button>
      </div>
    </div>
  );
};
