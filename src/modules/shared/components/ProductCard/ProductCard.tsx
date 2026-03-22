import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '@/types/Product';
import styles from './ProductCard.module.scss';
import { ButtonPrimary } from '@/modules/shared/ui/ButtonPrimary';
import { ButtonFavorite } from '@/modules/shared/ui/ButtonFavorite';
import { Price } from '../../ui/Price';
import { useFavorites } from '@/context/FavoritesContext';
import { useCart } from '@/context/CartContext';

interface Props {
  product: Product;
  showDiscount?: boolean;
}

export const ProductCard: React.FC<Props> = ({ product }) => {
  // --- CONTEXT HOOKS ---
  const { isFavorite, addToFavorites, removeFromFavorites } = useFavorites();
  const { cartItems, addToCart } = useCart();

  // --- PRODUCT DATA DESTRUCTURING ---
  const { itemId, name, screen, capacity, ram, image } = product;

  // --- IMAGE PATH LOGIC ---
  // Ensures the image path is correct regardless of whether the API provides a relative or absolute string
  const imageSrc = image.startsWith('/') ? image : `/${product.image}`;

  // --- CHECKING COMPONENT STATE ---
  const favorite = isFavorite(product.itemId);
  const isAdded = cartItems.some(item => item.itemId === product.itemId);

  // --- EVENT HANDLERS ---
  // Toggles the favorite status of the product.
  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();

    if (favorite) {
      removeFromFavorites(product.itemId);
    } else {
      addToFavorites(product);
    }
  };

  // Adds the product to the global cart state
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!isAdded) {
      addToCart(product);
    }
  };

  return (
    <article className={styles.card}>
      <Link to={`/product/${itemId}`} className={styles.card__imageContainer}>
        <img src={imageSrc} alt={name} className={styles.card__image} />
      </Link>

      <Link to={`/product/${itemId}`} className={styles.card__titleLink}>
        <h3 className={styles.card__title}>{name}</h3>
      </Link>

      <div className={styles.priceSection}>
        <Price price={product.price} fullPrice={product.fullPrice} />
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
      <div className={styles.card__buttons}>
        <ButtonPrimary isSelected={isAdded} onClick={handleAddToCart} />
        <ButtonFavorite isFavorite={favorite} onClick={handleToggleFavorite} />
      </div>
    </article>
  );
};
