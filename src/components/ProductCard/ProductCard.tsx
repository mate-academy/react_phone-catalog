import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import styles from './ProductCard.module.scss';
import { Product } from '../../types';
import { CartContext } from '../../context/CartContext';
import { FavoritesContext } from '../../context/FavoritesContext';

interface Props {
  product: Product;
}

export const ProductCard: React.FC<Props> = ({ product }) => {
  const { addToCart, isInCart } = useContext(CartContext);
  const { toggleFavorite, isFavorite } = useContext(FavoritesContext);

  const inCart = isInCart(product.id);
  const favorited = isFavorite(product.id);
  const hasDiscount = product.fullPrice > product.price;

  return (
    <div className={styles.card}>
      <Link to={`/product/${product.itemId}`} className={styles.imageLink}>
        <img src={product.image} alt={product.name} className={styles.image} />
      </Link>

      <Link to={`/product/${product.itemId}`} className={styles.title}>
        {product.name}
      </Link>

      <div className={styles.prices}>
        <span className={styles.price}>${product.price}</span>
        {hasDiscount && (
          <span className={styles.fullPrice}>${product.fullPrice}</span>
        )}
      </div>

      <hr className={styles.divider} />

      <div className={styles.specs}>
        <div className={styles.spec}>
          <span className={styles.specName}>Screen</span>
          <span className={styles.specValue}>{product.screen}</span>
        </div>
        <div className={styles.spec}>
          <span className={styles.specName}>Capacity</span>
          <span className={styles.specValue}>{product.capacity}</span>
        </div>
        <div className={styles.spec}>
          <span className={styles.specName}>RAM</span>
          <span className={styles.specValue}>{product.ram}</span>
        </div>
      </div>

      <div className={styles.actions}>
        {inCart ? (
          <button type="button" className={styles.addToCartAdded}>
            Added to cart
          </button>
        ) : (
          <button
            type="button"
            className={styles.addToCart}
            onClick={() => addToCart(product)}
          >
            Add to cart
          </button>
        )}

        <button
          type="button"
          className={styles.favButton}
          onClick={() => toggleFavorite(product)}
        >
          <img
            src={
              favorited ? 'img/icons/heart-filled.svg' : 'img/icons/heart.svg'
            }
            alt="Favorites"
          />
        </button>
      </div>
    </div>
  );
};
