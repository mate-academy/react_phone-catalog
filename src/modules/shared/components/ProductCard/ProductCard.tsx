import React from 'react';
import { Link } from 'react-router-dom';
import styles from './ProductCard.module.scss';

import { useFavorites } from '../../context/FavoritesContext';
import { useCart } from '../../context/CartContext';

import HeartIcon from '../../icons/heart-like.svg?react';
import HeartRedIcon from '../../icons/heart-like-red.svg?react';

type CardProduct = {
  id: string | number;
  itemId?: string;
  name: string;
  price: number;
  fullPrice: number;
  screen: string;
  capacity: string;
  ram: string;
  image: string;
};

type Props = {
  product: CardProduct;
  showFullPrice?: boolean;
};

export const ProductCard: React.FC<Props> = ({
  product,
  showFullPrice = true,
}) => {
  const slug = product.itemId ?? String(product.id);

  const imageSrc = product.image.startsWith('/')
    ? product.image
    : `/${product.image}`;

  const { isFavorite, toggleFavorite } = useFavorites();
  const active = isFavorite(product);

  const { addToCart, cart } = useCart();

  const hasDiscount = product.fullPrice > product.price;

  const isInCart = cart.some(item => item.id === slug);

  const handleAddToCart = () => {
    addToCart(slug, {
      id: slug,
      name: product.name,
      screen: product.screen,
      capacity: product.capacity,
      ram: product.ram,
      price: product.price,
      fullPrice: product.fullPrice,
      image: imageSrc,
    });
  };

  return (
    <article className={styles.card}>
      <Link to={`/product/${slug}`} className={styles.imageWrapper}>
        <img src={imageSrc} alt={product.name} className={styles.image} />
      </Link>

      <Link to={`/product/${slug}`} className={styles.name}>
        {product.name}
      </Link>

      <div className={styles.prices}>
        <span className={styles.price}>${product.price}</span>

        {showFullPrice && hasDiscount && (
          <span className={styles.fullPrice}>${product.fullPrice}</span>
        )}
      </div>

      <div className={styles.divider} />

      <dl className={styles.specs}>
        <div className={styles.specItem}>
          <dt className={styles.specTitle}>Screen</dt>
          <dd className={styles.specValue}>{product.screen}</dd>
        </div>

        <div className={styles.specItem}>
          <dt className={styles.specTitle}>Capacity</dt>
          <dd className={styles.specValue}>{product.capacity}</dd>
        </div>

        <div className={styles.specItem}>
          <dt className={styles.specTitle}>RAM</dt>
          <dd className={styles.specValue}>{product.ram}</dd>
        </div>
      </dl>

      <div className={styles.buttons}>
        <button
          type="button"
          className={styles.addToCartButton}
          onClick={handleAddToCart}
          disabled={isInCart}
        >
          {isInCart ? 'Added to cart' : 'Add to cart'}
        </button>

        <button
          type="button"
          className={`${styles.favouriteButton} ${
            active ? styles.favouriteButtonActive : ''
          }`}
          onClick={() => toggleFavorite(product)}
          aria-label={active ? 'Remove from favourites' : 'Add to favourites'}
        >
          {active ? (
            <HeartRedIcon className={styles.favIcon} />
          ) : (
            <HeartIcon className={styles.favIcon} />
          )}
        </button>
      </div>
    </article>
  );
};
