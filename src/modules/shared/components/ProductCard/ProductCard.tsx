import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../../../../types/Product';
import { useCart } from '../../../../context/CartContext';
import { useFavorites } from '../../../../context/FavoritesContext';
import { getAssetUrl } from '../../../../utils/getAssetUrl'; // Перевірте правильність відносного шляху
import styles from './ProductCard.module.scss';

interface Props {
  product: Product;
}

export const ProductCard: React.FC<Props> = ({ product }) => {
  const { cart, addToCart, removeFromCart } = useCart();
  const { toggleFavorite, isFavorite } = useFavorites();

  const inCart = cart.some(item => item.id === product.itemId);
  const favorite = isFavorite(product.itemId);

  const handleCartClick = () => {
    if (inCart) {
      removeFromCart(product.itemId);
    } else {
      addToCart(product);
    }
  };

  return (
    <div className={styles.card}>
      <Link
        to={`/product/${product.itemId}`}
        className={styles.card__imageContainer}
      >
        <img
          src={getAssetUrl(product.image)}
          alt={product.name}
          className={styles.card__image}
        />
      </Link>

      <Link to={`/product/${product.itemId}`}>
        <h3 className={styles.card__title}>{product.name}</h3>
      </Link>

      <div className={styles.card__prices}>
        <span className={styles.card__price}>${product.price}</span>
        {product.fullPrice > product.price && (
          <span className={styles.card__priceRegular}>
            ${product.fullPrice}
          </span>
        )}
      </div>

      <hr className={styles.card__divider} />

      <div className={styles.card__specs}>
        <div className={styles.card__specRow}>
          <span className={styles.card__specLabel}>Screen</span>
          <span className={styles.card__specValue}>{product.screen}</span>
        </div>
        <div className={styles.card__specRow}>
          <span className={styles.card__specLabel}>Capacity</span>
          <span className={styles.card__specValue}>{product.capacity}</span>
        </div>
        <div className={styles.card__specRow}>
          <span className={styles.card__specLabel}>RAM</span>
          <span className={styles.card__specValue}>{product.ram}</span>
        </div>
      </div>

      <div className={styles.card__actions}>
        <button
          type="button"
          onClick={handleCartClick}
          className={`${styles.card__cartBtn} ${
            inCart ? styles.card__cartBtnSelected : ''
          }`}
        >
          {inCart ? 'Added' : 'Add to cart'}
        </button>

        <button
          type="button"
          onClick={() => toggleFavorite(product)}
          className={`${styles.card__favBtn} ${
            favorite ? styles.card__favBtnActive : ''
          }`}
          aria-label={favorite ? 'Remove from favorites' : 'Add to favorites'}
        >
          <img
            src={getAssetUrl(
              favorite ? 'img/icons/Filled.svg' : 'img/icons/Heart.svg',
            )}
            alt="Favorite icon"
            className={styles.card__favIcon}
          />
        </button>
      </div>
    </div>
  );
};
