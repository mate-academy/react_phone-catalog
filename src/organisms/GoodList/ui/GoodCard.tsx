import Button from '@/atoms/Button';
import styles from './GoodCard.module.scss';
import Heart from '@/assets/icons/heart.svg?react';

import { Phone } from '@/types/phone';
import { FC } from 'react';

type Props = {
  item: Phone;
};

export const GoodCard: FC<Props> = ({ item }) => {
  const { images, name, priceRegular, screen, capacity, ram } = item;

  return (
    <article className={styles.card}>
      <img className={styles.card__img} src={images[0]} alt={name} />
      <div className={styles.card__footer}>
        <h3 className={styles.card__name}>{name}</h3>
        <p className={styles.card__priceRegular}>${priceRegular}</p>
        <div className={styles.card__br} />
        <dl className={styles.card__specs}>
          <div className={styles.card__stat}>
            <dt className={styles.card__stat__Name}>Screen</dt>
            <dd className={styles.card__stat__Info}>{screen}</dd>
          </div>
          <div className={styles.card__stat}>
            <dt className={styles.card__stat__Name}>Capacity</dt>
            <dd className={styles.card__stat__Info}>{capacity}</dd>
          </div>
          <div className={styles.card__stat}>
            <dt className={styles.card__stat__Name}>Ram</dt>
            <dd className={styles.card__stat__Info}>{ram}</dd>
          </div>
        </dl>
        <div className={styles.card__footer__controls}>
          <Button classNames={styles.button__cart} variant="primary">
            Add to cart
          </Button>
          <Button
            variant="secondary"
            classNames={styles.button__like}
            aria-label="Add to favorites"
          >
            <Heart />
          </Button>
        </div>
      </div>
    </article>
  );
};
