import React from 'react';
import { Product } from '../../types/Products';
import styles from './ProductCard.styles.module.scss';
import FavoritesHeart from '../../assets/icons/favouritesheart.svg?react';
import FavoritesFilled from '../../assets/icons/favouritesHeatFilled.svg?react';
import { Link } from 'react-router-dom';
import { useFavorites } from '../../context';
import { useCart } from '../../context/CartContext';
import classNames from 'classnames';

type Props = {
  product: Product;
};

export const ProductCard: React.FC<Props> = ({ product }) => {
  const { toggleFavorite, isFavorite } = useFavorites();
  const { addToCart, isInCart } = useCart();

  const favorite = isFavorite(product.itemId);
  const inCart = isInCart(product.itemId);

  return (
    <article className={styles.card}>
      <Link to={`/product/${product.itemId}`}>
        <img className={styles.image} src={product.image} alt={product.name} />
      </Link>
      <Link to={`/product/${product.itemId}`} className={styles.productLink}>
        <h3 className={styles.card__name}>{product.name}</h3>
      </Link>
      <div className={styles.card__price}>
        <span className={styles.price__discount}>${product.price}</span>
        <span className={styles.price__regular}>${product.fullPrice}</span>
      </div>
      <div className={styles.card__info}>
        <div className={styles.infoRow}>
          <span className={styles.infoLabel}>Screen</span>
          <span className={styles.infoValue}>{product.screen}</span>
        </div>

        <div className={styles.infoRow}>
          <span className={styles.infoLabel}>Capacity</span>
          <span className={styles.infoValue}>{product.capacity}</span>
        </div>

        <div className={styles.infoRow}>
          <span className={styles.infoLabel}>RAM</span>
          <span className={styles.infoValue}>{product.ram}</span>
        </div>
      </div>
      <div className={styles.card__buttons}>
        <button
          type="button"
          className={classNames(styles.addToCart, {
            [styles.added]: inCart,
          })}
          onClick={() => addToCart(product)}
        >
          {inCart ? 'Added to cart' : 'Add to cart'}
        </button>
        <button
          type="button"
          className={styles.addToFavorite}
          onClick={() => toggleFavorite(product)}
        >
          {favorite ? <FavoritesFilled /> : <FavoritesHeart />}
        </button>
      </div>
    </article>
  );
};
