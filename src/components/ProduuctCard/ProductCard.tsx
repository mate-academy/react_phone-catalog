import React from 'react';
import styles from './ProductCard.module.scss';
import { Product } from '../../modules/HomePage/HomePage';
import HeartIcon from '../../api/buttoms/Addtf.svg';
import { useGlobal } from '../CartContext/CartContext';
import like from '../../api/buttoms/Add to fovourites - Added.svg';
import { Link } from 'react-router-dom';

interface Props {
  product: Product;
}

export const ProductCard: React.FC<Props> = ({ product }) => {
  const { favorites, cart, addToFavorites, addToCart } = useGlobal();

  const isFavorite = favorites.some(f => String(f.id) === String(product.id));

  const isInCart = cart.some(c => c.id === product.id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();

    e.stopPropagation();

    addToCart(product);
  };

  const handleAddToFavorites = (e: React.MouseEvent) => {
    e.preventDefault();

    e.stopPropagation();

    addToFavorites(product);
  };

  return (
    <Link to={`/${product.category}/${product.itemId}`} className={styles.card}>
      <div className={styles.imageContainer}>
        <img src={product.image} alt={product.name} className={styles.image} />
      </div>

      <h3 className={styles.name}>{product.name}</h3>

      <div className={styles.priceContainer}>
        <span className={styles.price}>${product.price}</span>

        {product.fullPrice > product.price && (
          <span className={styles.oldPrice}>${product.fullPrice}</span>
        )}
      </div>

      <div className={styles.divider} />

      <div className={styles.specs}>
        <div className={styles.spec}>
          <span>Screen</span>
          <span>{product.screen}</span>
        </div>
        <div className={styles.spec}>
          <span>Capacity</span>
          <span>{product.capacity}</span>
        </div>
        <div className={styles.spec}>
          <span>RAM</span>
          <span>{product.ram}</span>
        </div>
      </div>

      <div className={styles.actions}>
        <button
          className={`${styles.addBtn} ${isInCart ? styles.inCart : ''}`}
          onClick={handleAddToCart}
        >
          {isInCart ? 'Added' : 'Add to cart'}
        </button>

        <button className={styles.favBtn} onClick={handleAddToFavorites}>
          <img src={isFavorite ? like : HeartIcon} alt="favorite" />
        </button>
      </div>
    </Link>
  );
};
