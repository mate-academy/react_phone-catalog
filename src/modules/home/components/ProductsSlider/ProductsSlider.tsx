import React from 'react';
import styles from './ProductsSlider.module.scss';
import { Phone } from '../../../../types/phone';

type Props = {
  phone: Phone;
};

export const ProductSlider: React.FC<Props> = ({ phone }) => {
  return (
    <article className={styles.card}>
      <img src={phone.images[0]} alt={phone.id} className={styles.img} />
      <p className={styles.title}>{phone.name}</p>

      <div className={styles.priceContainer}>
        <span className={styles.price}>
          ${phone.priceRegular || phone.priceDiscount}
        </span>

        {phone.priceRegular && phone.priceRegular !== phone.priceDiscount && (
          <span className={styles.discount}>${phone.priceDiscount}</span>
        )}
      </div>

      <div className={styles.specs}>
        <div className={styles.specRow}>
          <p className={styles.specTitle}>Screen</p>
          <span className={styles.description}>{phone.screen}</span>
        </div>
        <div className={styles.specRow}>
          <p className={styles.specTitle}>Capacity</p>
          <span className={styles.description}>{phone.capacity}</span>
        </div>
        <div className={styles.specRow}>
          <p className={styles.specTitle}>RAM</p>
          <span className={styles.description}>{phone.ram}</span>
        </div>
      </div>

      <div className={styles.buttons}>
        <button className={styles.addToCart}>Add to cart</button>
        <div>
          <button className={styles.iconLink} aria-label="Toggle favorites">
            <img src="/img/icons/favorites.svg" alt="Favorites" />
          </button>
        </div>
      </div>
    </article>
  );
};
