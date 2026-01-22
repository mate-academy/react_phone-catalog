import React from 'react';
import { Link } from 'react-router-dom';
import cn from 'classnames';
import styles from './ProductCard.module.scss';
import { Product } from '../../types/Product';
import { useCart } from '../../context/CartContext';
import { useFav } from '../../context/FavContext';

type Props = {
  product: Product;
};

export const ProductCard: React.FC<Props> = ({ product }) => {
  const { addToCart, isInCart } = useCart();
  const { toggleFav, isInFav } = useFav();

  const isAdded = isInCart(product.id);
  const isFav = isInFav(product.id);

  const { name, screen, capacity, ram, image, itemId, category } = product;

  /* 👇 NAPRAWA: Sprawdzamy oba warianty nazw cen.
     Dzięki temu karta zadziała zarówno dla danych z listy, jak i detali. */
  const currentPrice = product.price || product.priceDiscount;
  const oldPrice = product.fullPrice || product.priceRegular;

  const mainImage = image || product.images?.[0] || '';

  const fixedImage = (url: string) => {
    if (!url) {
      return '';
    }

    const path = url.startsWith('/') ? url : `/${url}`;

    return path.replace('.jpg', '.webp');
  };

  const imageUrl = fixedImage(mainImage);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!isAdded) {
      addToCart(product);
    }
  };

  const handleFavClick = (e: React.MouseEvent) => {
    e.preventDefault();
    toggleFav(product);
  };

  return (
    <article className={styles.card}>
      <Link to={`/${category}/${itemId}`} className={styles.imageLink}>
        <img
          src={imageUrl}
          alt={name}
          className={styles.image}
          loading="lazy"
        />
      </Link>

      <Link to={`/${category}/${itemId}`} className={styles.title}>
        {name}
      </Link>

      <div className={styles.prices}>
        <span className={styles.price}>${currentPrice}</span>
        {oldPrice && oldPrice !== currentPrice && (
          <span className={styles.fullPrice}>${oldPrice}</span>
        )}
      </div>

      <div className={styles.divider} />

      <div className={styles.specs}>
        <div className={styles.spec}>
          <span className={styles.specName}>Screen</span>
          <span className={styles.specValue}>{screen}</span>
        </div>
        <div className={styles.spec}>
          <span className={styles.specName}>Capacity</span>
          <span className={styles.specValue}>{capacity}</span>
        </div>
        <div className={styles.spec}>
          <span className={styles.specName}>RAM</span>
          <span className={styles.specValue}>{ram}</span>
        </div>
      </div>

      <div className={styles.actions}>
        <button
          type="button"
          className={cn(styles.addToCartBtn, { [styles.added]: isAdded })}
          onClick={handleAddToCart}
          disabled={isAdded}
        >
          {isAdded ? 'Added' : 'Add to cart'}
        </button>

        <button
          type="button"
          className={cn(styles.favoriteBtn, { [styles.isFav]: isFav })}
          onClick={handleFavClick}
        >
          <img
            src={isFav ? '/img/icons/Heart Like.svg' : '/img/icons/Heart.svg'}
            alt="Like"
          />
        </button>
      </div>
    </article>
  );
};
