import React from 'react';
import styles from './ProductCard.module.scss';
import { Phone } from '../../types/Phone';

interface Props {
  phone: Phone;
}

export const ProductCard: React.FC<Props> = ({ phone }) => {
  const { name, priceRegular, screen, capacity, ram, images } = phone;

  const imageUrl = `/${images[0]}`;
  const screenDisplay = screen.replace('(Super Retina XDR)', '').trim();

  return (
    <article className={styles.card}>
      <div className={styles.imageContainer}>
        <img src={imageUrl} alt={name} className={styles.image} />
      </div>

      <h3 className={styles.title}>{name}</h3>

      <div className={styles.price}>${priceRegular}</div>

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
