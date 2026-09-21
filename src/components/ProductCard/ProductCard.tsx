import React from 'react';
import { Link } from 'react-router-dom';
import { useFavorites } from '../../context/FavoritesContext';
import { useCart } from '../../context/CartContext';
import styles from './ProductCard.module.scss';

export interface Product {
  id: string;
  itemId?: string;
  category: string;
  name: string;
  fullPrice?: number;
  priceRegular?: number;
  price?: number;
  priceDiscount?: number;
  screen?: string;
  capacity?: string;
  ram?: string;
  color?: string;
  image?: string;
  images?: string[];
}

const getAssetUrl = (path?: string) => {
  if (!path) {
    return '';
  }

  if (path.startsWith('http')) {
    return path;
  }

  const cleanPath = path.startsWith('/') ? path.slice(1) : path;

  return `${import.meta.env.BASE_URL}${cleanPath}`;
};

export const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  const { isFavorite, addToFavorites, removeFromFavorites } = useFavorites();
  const { isInCart, addToCart, removeFromCart } = useCart();

  const favorite = isFavorite(product.id);
  const inCart = isInCart(product.id);

  // Определяем цену и картинку вне зависимости от формата JSON
  const currentPrice = product.priceDiscount ?? product.price ?? 0;
  const regularPrice = product.priceRegular ?? product.fullPrice ?? 0;
  const imageUrl = product.image || product.images?.[0] || '';

  return (
    <div className={styles.card}>
      <Link
        to={`/${product.category}/${product.itemId || product.id}`}
        className={styles.imageLink}
      >
        <img
          src={getAssetUrl(imageUrl)}
          alt={product.name}
          className={styles.image}
        />
      </Link>

      <Link
        to={`/${product.category}/${product.itemId || product.id}`}
        className={styles.titleLink}
      >
        <h3 className={styles.title}>{product.name}</h3>
      </Link>

      <div className={styles.priceRow}>
        <span className={styles.price}>${currentPrice}</span>
        {regularPrice > currentPrice && (
          <span className={styles.fullPrice}>${regularPrice}</span>
        )}
      </div>

      <div className={styles.divider} />

      <div className={styles.specs}>
        <div className={styles.specRow}>
          <span>Screen</span>
          <span>{product.screen || 'N/A'}</span>
        </div>
        <div className={styles.specRow}>
          <span>Capacity</span>
          <span>{product.capacity || 'N/A'}</span>
        </div>
        <div className={styles.specRow}>
          <span>RAM</span>
          <span>{product.ram || 'N/A'}</span>
        </div>
      </div>

      <div className={styles.actions}>
        <button
          type="button"
          className={`${styles.cartBtn} ${inCart ? styles.inCart : ''}`}
          onClick={() =>
            inCart ? removeFromCart(product.id) : addToCart(product)
          }
        >
          {inCart ? 'Added' : 'Add to cart'}
        </button>

        <button
          type="button"
          className={styles.favoriteBtn}
          onClick={() =>
            favorite ? removeFromFavorites(product.id) : addToFavorites(product)
          }
        >
          <img
            src={getAssetUrl(
              favorite
                ? 'img/icons/favourites-filled.svg'
                : 'img/icons/favourites.svg',
            )}
            alt="Favorite"
          />
        </button>
      </div>
    </div>
  );
};
