import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../../types/Product';
import { useCart } from '../../context/CartContext/CartContext';
import { useFavorites } from '../../context/FavoritesContext/FavoritesContext';
import { getPublicUrl } from '../../utils/getPublicUrl';
import styles from './ProductCard.module.scss';

interface Props {
  product: Product;
  showFullPrice?: boolean;
}

export const ProductCard: React.FC<Props> = ({
  product,
  showFullPrice = false,
}) => {
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

  const productImage = getPublicUrl(image);

  const favoriteIcon = getPublicUrl(
    favorite ? 'img/icons/heart-filled.svg' : 'img/icons/heart.svg',
  );

  return (
    <div className={styles.card}>
      <Link to={`/product/${itemId}`} className={styles.imageLink}>
        <img src={productImage} alt={name} className={styles.image} />
      </Link>

      <Link to={`/product/${itemId}`} className={styles.title}>
        {name}
      </Link>

      <div className={styles.prices}>
        <span className={styles.price}>
          ${showFullPrice ? fullPrice : price}
        </span>

        {!showFullPrice && fullPrice > price && (
          <span className={styles.fullPrice}>${fullPrice}</span>
        )}
      </div>

      <div className={styles.divider} />

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
          aria-label={favorite ? 'Remove from favorites' : 'Add to favorites'}
        >
          <img src={favoriteIcon} alt="" />
        </button>
      </div>
    </div>
  );
};
