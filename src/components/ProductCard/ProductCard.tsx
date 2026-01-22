import React from 'react';
import styles from './ProductCard.module.scss';
import { Phone } from '../../types/Phone';

interface Props {
  phone: Phone;
  showRegularPriceOnly?: boolean;
}

export const ProductCard: React.FC<Props> = ({
  phone,
  showRegularPriceOnly = false,
}) => {
  const { name, priceRegular, priceDiscount, screen, capacity, ram, images } =
    phone;

  const imageUrl = `/${images[0]}`;
  const screenDisplay = screen.replace('(Super Retina XDR)', '').trim();
  const showFullPrice =
    !showRegularPriceOnly &&
    priceDiscount !== 0 &&
    priceDiscount !== priceRegular;

  return (
    <article className={styles.card}>
      <div className={styles.imageContainer}>
        <img src={imageUrl} alt={name} className={styles.image} />
      </div>

      <h3 className={styles.title}>{name}</h3>

      <div className={styles.price}>
        <span>
          ${showRegularPriceOnly ? priceRegular : priceDiscount || priceRegular}
        </span>
        {showFullPrice && (
          <span className={styles.fullPrice}>${priceRegular}</span>
        )}
      </div>

      <div className={styles.divider} />

      <div className={styles.specs}>
        <div className={styles.specRow}>
          <span className={styles.specName}>Screen</span>
          <span className={styles.specValue}>{screenDisplay}</span>
        </div>
        <div className={styles.specRow}>
          <span className={styles.specName}>Capacity</span>
          <span className={styles.specValue}>{capacity}</span>
        </div>
        <div className={styles.specRow}>
          <span className={styles.specName}>RAM</span>
          <span className={styles.specValue}>{ram}</span>
        </div>
      </div>

      <div className={styles.actions}>
        <button type="button" className={styles.addToCart}>
          Add to cart
        </button>
        <button
          type="button"
          className={styles.favorite}
          aria-label="Add to favorites"
        >
          <img src="/img/heart.svg" alt="Heart" />
        </button>
      </div>
    </article>
  );
};
