import classNames from 'classnames';
import styles from './Card.module.scss';
import { useState } from 'react';
import { CardDetail } from '../CardDetail/CardDetail';
import { Icon } from '../ui/Icon';

export const Card = () => {
  const [isFavorite, setIsFavorite] = useState(false);

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  return (
    <div className={styles.card}>
      <a href="#" className={styles.card__link}>
        <img
          src="./img/phones/apple-iphone-14-pro/gold/00.webp"
          alt="phone"
          className={styles.card__img}
        />
      </a>

      <p className="body-text">Apple iPhone 14 Pro 128GB Gold (MQ023)</p>

      <h3 className={styles.card__price}>$999</h3>

      <CardDetail label="Screen" value="6.1” OLED" />
      <CardDetail label="Capacity" value="128 GB" />
      <CardDetail label="RAM" value="6 GB" />

      <div className={styles.card__buttons}>
        <button
          className={classNames(
            'button-text',
            styles.card__btn,
            styles['card__btn--add'],
          )}
        >
          Add to cart
        </button>
        <button
          className={classNames(
            styles.card__btn,
            styles['card__btn--favorite'],
          )}
          onClick={toggleFavorite}
        >
          {isFavorite ? (
            <Icon iconName="favorites-filled" />
          ) : (
            <Icon iconName="favorites" />
          )}
        </button>
      </div>
    </div>
  );
};
