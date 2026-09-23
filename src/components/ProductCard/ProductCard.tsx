import React from 'react';
import { Link } from 'react-router-dom';
import { useFavorites } from '../../context/FavoritesContext';
import { useCart } from '../../context/CartContext';
import styles from './ProductCard.module.scss';
import { getBaseUrl } from '../../utils/BaseUrl';

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

  return `${getBaseUrl()}${cleanPath}`;
};

interface ProductCardProps {
  product: Product;
  hideDiscount?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  hideDiscount = false,
}) => {
  const { isFavorite, addToFavorites, removeFromFavorites } = useFavorites();
  const { isInCart, addToCart, removeFromCart } = useCart();

  // Единый идентификатор товара (itemId в приоритете)
  const productId = product.itemId || product.id;
  const normalizedProduct = { ...product, id: productId };

  const favorite = isFavorite(productId);
  const inCart = isInCart(productId);

  // Безопасное определение цен
  const currentPrice = Number(
    product.price ?? product.priceDiscount ?? product.fullPrice ?? 0,
  );
  const regularPrice = Number(
    product.fullPrice ?? product.priceRegular ?? currentPrice,
  );

  const imageUrl = product.image || product.images?.[0] || '';
  const hasDiscount = !hideDiscount && regularPrice > currentPrice;

  return (
    <div className={styles.card}>
      <Link
        to={`/${product.category}/${productId}`}
        className={styles.imageLink}
      >
        <img
          src={getAssetUrl(imageUrl)}
          alt={product.name}
          className={styles.image}
        />
      </Link>

      <Link
        to={`/${product.category}/${productId}`}
        className={styles.titleLink}
      >
        <h3 className={styles.title}>{product.name}</h3>
      </Link>

      <div className={styles.priceRow}>
        <span className={styles.price}>${currentPrice}</span>
        {hasDiscount && (
          <span className={styles.fullPrice}>${regularPrice}</span>
        )}
      </div>

      <div className={styles.divider} />

      <div className={styles.specs}>
        <div className={styles.specRow}>
          <span className={styles.specLabel}>Screen</span>
          <span className={styles.specValue}>{product.screen || 'N/A'}</span>
        </div>
        <div className={styles.specRow}>
          <span className={styles.specLabel}>Capacity</span>
          <span className={styles.specValue}>{product.capacity || 'N/A'}</span>
        </div>
        <div className={styles.specRow}>
          <span className={styles.specLabel}>RAM</span>
          <span className={styles.specValue}>{product.ram || 'N/A'}</span>
        </div>
      </div>

      <div className={styles.actions}>
        <button
          type="button"
          className={`${styles.cartBtn} ${inCart ? styles.inCart : ''}`}
          onClick={() =>
            inCart ? removeFromCart(productId) : addToCart(normalizedProduct)
          }
        >
          {inCart ? 'Added' : 'Add to cart'}
        </button>

        <button
          type="button"
          className={`${styles.favoriteBtn} ${favorite ? styles.isFavorite : ''}`}
          onClick={() =>
            favorite
              ? removeFromFavorites(productId)
              : addToFavorites(normalizedProduct)
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
