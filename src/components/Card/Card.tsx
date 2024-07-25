import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as outlineHeart } from '@fortawesome/free-regular-svg-icons';
import classNames from 'classnames';
import styles from './Card.module.scss';
import { useState } from 'react';
import { CardDetail } from '../CardDetail/CardDetail';

export const Card = () => {
  const [isFavorite, setIsFavorite] = useState(false);

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  return (
    <div className={styles.card}>
      <a href="#" className="card__link">
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
          <FontAwesomeIcon
            icon={isFavorite ? solidHeart : outlineHeart}
            className={classNames(styles.favoriteIcon, {
              [styles.regular]: !isFavorite,
            })}
          />
        </button>
      </div>
    </div>
  );
};
