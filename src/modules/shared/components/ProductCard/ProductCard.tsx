import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../../types/Product';
import { useCart } from '../../context/CartContext';
import { useFavorites } from '../../context/FavoritesContext';
import styles from './ProductCard.module.scss';

interface Props {
  product: Product;
}

export const ProductCard: React.FC<Props> = ({ product }) => {
  const { cart, addToCart, removeFromCart } = useCart();
  const { isFavorite, toggleFavorite } = useFavorites();

  const { id, name, price, fullPrice, screen, capacity, ram, image, imageUrl } =
    product;

  // Формуємо безпечний шлях до картинки товару
  const rawImagePath = image || imageUrl || '';
  const cleanImagePath = rawImagePath.replace(/^\//, '');
  const productImgSrc = `${import.meta.env.BASE_URL}${cleanImagePath}`;

  const isInCart = cart.some(item => item.id === id);
  const favorite = isFavorite(id);

  const handleCartClick = () => {
    if (isInCart) {
      removeFromCart(id);
    } else {
      addToCart(product);
    }
  };

  return (
    <div className={styles.card}>
      <Link to={`/products/${id}`} className={styles.imageWrapper}>
        <img src={productImgSrc} alt={name} className={styles.image} />
      </Link>

      <Link to={`/products/${id}`} className={styles.title}>
        {name}
      </Link>

      <div className={styles.prices}>
        <span className={styles.price}>${price}</span>
        {fullPrice && <span className={styles.fullPrice}>${fullPrice}</span>}
      </div>

      <div className={styles.divider} />

      <div className={styles.specs}>
        <div className={styles.specRow}>
          <span className={styles.specLabel}>Screen</span>
          <span className={styles.specValue}>{screen || '-'}</span>
        </div>
        <div className={styles.specRow}>
          <span className={styles.specLabel}>Capacity</span>
          <span className={styles.specValue}>{capacity || '-'}</span>
        </div>
        <div className={styles.specRow}>
          <span className={styles.specLabel}>RAM</span>
          <span className={styles.specValue}>{ram || '-'}</span>
        </div>
      </div>

      <div className={styles.buttons}>
        <button
          type="button"
          onClick={handleCartClick}
          className={`${styles.cartButton} ${isInCart ? styles.selected : ''}`}
        >
          {isInCart ? 'Added' : 'Add to cart'}
        </button>

        <button
          type="button"
          onClick={() => toggleFavorite(product)}
          className={`${styles.favoriteButton} ${favorite ? styles.selected : ''}`}
          aria-label="Favorite"
        >
          <img
            src={
              favorite
                ? `${import.meta.env.BASE_URL}img/icons/heart-filled.svg`
                : `${import.meta.env.BASE_URL}img/icons/heart.svg`
            }
            alt="Favorite icon"
          />
        </button>
      </div>
    </div>
  );
};
