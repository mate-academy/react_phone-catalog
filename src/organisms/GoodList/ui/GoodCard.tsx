import Button from '@/atoms/Button';
import styles from './GoodCard.module.scss';
import Heart from '@/assets/icons/heart.svg?react';


import { Phone } from '@/types/phone';
import { FC } from 'react';

type Props = {
  item: Phone;
};

export const GoodCard: FC<Props> = ({ item }) => {
  return (
    <div className={styles.card}>
      <img className={styles.card__img} src={item.images[0]} />
      <div className={styles.card__footer}>
        <label className={styles.card__name}>{item.name}</label>

        <div className={styles.card__footer__controls}>
          <Button className={styles.button__cart}>Add to cart</Button>
          <Button className={styles.button__like}>
            <Heart />
          </Button>
        </div>
      </div>
    </div>
  );
};
