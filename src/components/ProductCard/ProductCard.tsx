import { Link } from 'react-router-dom';

import { Product } from '../../types/Product';
import { useStore } from '../../context/StoreContext';

import styles from './ProductCard.module.scss';

type Props = {
  product: Product;
  className?: string;
};

export const ProductCard = ({ product, className = '' }: Props) => {
  const { cart, favorites, addToCart, removeFromCart, toggleFavorite } =
    useStore();

  const imageSrc = `${import.meta.env.BASE_URL}${product.image}`;

  const heartIconSrc = `${import.meta.env.BASE_URL}img/icons/heart.svg`;

  const heartFilledIconSrc = `${import.meta.env.BASE_URL}img/icons/heart-filled.svg`;

  const isInCart = Boolean(cart[product.id]);
  const isFavorite = favorites.includes(product.id);

  const handleAddToCart = () => {
    if (isInCart) {
      removeFromCart(product.id);

      return;
    }

    addToCart(product.id);
  };

  const handleToggleFavorite = () => {
    toggleFavorite(product.id);
  };

  const handleProductNavigation = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'auto',
    });
  };

  return (
    <article className={`${styles.card} ${className}`}>
      <Link
        to={`/product/${product.itemId}`}
        className={styles.imageLink}
        onClick={handleProductNavigation}
      >
        <img src={imageSrc} alt={product.name} className={styles.image} />
      </Link>

      <Link
        to={`/product/${product.itemId}`}
        className={styles.title}
        onClick={handleProductNavigation}
      >
        {product.name}
      </Link>

      <div className={styles.priceBlock}>
        <span className={styles.price}>${product.price}</span>

        <span className={styles.fullPrice}>${product.fullPrice}</span>
      </div>

      <div className={styles.divider} />

      <dl className={styles.specs}>
        <div className={styles.spec}>
          <dt>Screen</dt>
          <dd>{product.screen}</dd>
        </div>

        <div className={styles.spec}>
          <dt>Capacity</dt>
          <dd>{product.capacity}</dd>
        </div>

        <div className={styles.spec}>
          <dt>RAM</dt>
          <dd>{product.ram}</dd>
        </div>
      </dl>

      <div className={styles.actions}>
        <button
          type="button"
          aria-label={isInCart ? 'Remove from cart' : 'Add to cart'}
          className={`${styles.addButton} ${
            isInCart ? styles.addedButton : ''
          }`}
          onClick={handleAddToCart}
        >
          {isInCart ? 'Added to cart' : 'Add to cart'}
        </button>

        <button
          type="button"
          className={`${styles.favoriteButton} ${
            isFavorite ? styles.favoriteButtonActive : ''
          }`}
          aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
          aria-pressed={isFavorite}
          onClick={handleToggleFavorite}
        >
          <img
            src={isFavorite ? heartFilledIconSrc : heartIconSrc}
            alt=""
            className={styles.heartIcon}
          />
        </button>
      </div>
    </article>
  );
};
