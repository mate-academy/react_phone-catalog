import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../../types';
import { useCart } from '../../context/CartContext';
import { useFavorites } from '../../context/FavoritesContext';
import styles from './ProductCard.module.scss';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();
  const { addToFavorites, removeFromFavorites, isFavorite } = useFavorites();

  const handleAddToCart = () => {
    addToCart(product);
  };

  const handleToggleFavorite = () => {
    if (isFavorite(product.itemId)) {
      removeFromFavorites(product.itemId);
    } else {
      addToFavorites(product);
    }
  };

  const discount = product.fullPrice - product.price;
  const discountPercentage = Math.round((discount / product.fullPrice) * 100);

  return (
    <div className={styles.productCard}>
      <Link to={`/product/${product.itemId}`} className={styles.imageLink}>
        <img src={product.image} alt={product.name} className={styles.image} />
      </Link>

      <div className={styles.content}>
        <Link to={`/product/${product.itemId}`} className={styles.titleLink}>
          <h3 className={styles.title}>{product.name}</h3>
        </Link>

        <div className={styles.price}>
          <span className={styles.currentPrice}>${product.price}</span>
          {discount > 0 && (
            <>
              <span className={styles.oldPrice}>${product.fullPrice}</span>
              <span className={styles.discount}>-{discountPercentage}%</span>
            </>
          )}
        </div>

        <div className={styles.specs}>
          <div className={styles.spec}>
            <span className={styles.specLabel}>Screen</span>
            <span className={styles.specValue}>{product.screen}</span>
          </div>
          <div className={styles.spec}>
            <span className={styles.specLabel}>Capacity</span>
            <span className={styles.specValue}>{product.capacity}</span>
          </div>
          <div className={styles.spec}>
            <span className={styles.specLabel}>RAM</span>
            <span className={styles.specValue}>{product.ram}</span>
          </div>
        </div>

        <div className={styles.actions}>
          <button className={styles.cartButton} onClick={handleAddToCart}>
            Add to cart
          </button>
          <button
            className={`${styles.favoriteButton} ${isFavorite(product.itemId) ? styles.active : ''}`}
            onClick={handleToggleFavorite}
          >
            <i className="fas fa-heart"></i>
          </button>
        </div>
      </div>
    </div>
  );
};
