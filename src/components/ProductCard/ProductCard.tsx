/* eslint-disable max-len */
import React from 'react';
import styles from './ProductCard.module.scss';
import addToFovouritesDefault from '../../../public/img/assets/icons/addToFovouritesDefault.png';
import iphone14pro from '../../../public/img/phones/apple-iphone-14-pro/spaceblack/00.webp';

export const ProductCard: React.FC = () => {
  return (
    <div className={styles.card}>
      <img className={styles.card__img} src={iphone14pro} alt="iphone 14 pro" />
      <h3 className={styles.card__title}>
        Apple iPhone 14 Pro 128GB Silver (MQ023)
      </h3>
      <p className={styles.card__price}>$999</p>

      <hr className={styles.card__horizontalRule} />

      <div className={styles.card__specs}>
        <div>
          <span className={styles.card__characteristics}>Screen</span>
          <span className={styles.card__values}>6.1” OLED</span>
        </div>
        <div>
          <span className={styles.card__characteristics}>Capacity</span>
          <span className={styles.card__values}>128 GB</span>
        </div>
        <div>
          <span className={styles.card__characteristics}>RAM</span>
          <span className={styles.card__values}>6 GB</span>
        </div>
      </div>

      <div className={styles.card__buttons}>
        <button className={styles.card__addCartBtn}>Add to cart</button>
        <button className={styles.card__addFovouritesBtn}>
          <img
            className={styles.card__icon}
            src={addToFovouritesDefault}
            alt="addToFovourites"
          />
        </button>
      </div>
    </div>
  );
};
