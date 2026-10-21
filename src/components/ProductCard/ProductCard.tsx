import React from 'react';
import { Link } from 'react-router-dom';
import { useFavorites } from '../../context/FavoritesContext';
import { useCart } from '../../context/CartContext';
import { Product } from '../../types/Product';
import { getAssetUrl } from '../../utils/assets';
import {
  getCurrentPrice,
  getProductId,
  getRegularPrice,
  normalizeProduct,
} from '../../utils/product';
import styles from './ProductCard.module.scss';

interface ProductCardProps {
  product: Product;
  hideDiscount?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  hideDiscount = false,
}) => {
  const { isFavorite, addToFavorites, removeFromFavorites } = useFavorites();
  const { isInCart, addToCart } = useCart();

  const productId = getProductId(product);
  const normalizedProduct = normalizeProduct(product);

  const favorite = isFavorite(productId);
  const inCart = isInCart(productId);

  const currentPrice = getCurrentPrice(product);
  const regularPrice = getRegularPrice(product);

  const imageUrl = product.image || product.images?.[0] || '';
  const hasDiscount = !hideDiscount && regularPrice > currentPrice;

  return (
    <div className={styles.card}>
      <Link to={`/product/${productId}`} className={styles.imageLink}>
        <img
          src={getAssetUrl(imageUrl)}
          alt={product.name}
          className={styles.image}
        />
      </Link>

      <Link to={`/product/${productId}`} className={styles.titleLink}>
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
          onClick={() => {
            if (!inCart) {
              addToCart(normalizedProduct);
            }
          }}
        >
          {inCart ? 'Added to cart' : 'Add to cart'}
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
