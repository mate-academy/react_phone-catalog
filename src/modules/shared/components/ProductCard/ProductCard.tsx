import { Link } from 'react-router-dom';
import styles from './ProductCard.module.scss';
import { Button } from '../Button';
import { AddToFavourites } from '../AddToFavourites';

type Props = {
  title: string;
};

export const ProductCard = ({ title }: Props) => {
  return (
    <div className={styles.card}>
      <Link to={'/'}>
        <img
          className={styles.card__image}
          src="public/img/phones/apple-iphone-14-pro/gold/00.webp"
          loading="lazy"
        ></img>
      </Link>
      <Link className={styles.card__title} to={'/'}>
        {title}
      </Link>
      <div className={styles.card__price}>
        <p className={styles['card__price-current']}>$799</p>
        <p className={styles['card__price-before']}>$899</p>
      </div>
      <div className={styles.card__divider}></div>
      <div className={styles.card__specifications}>
        <div className={styles['card__specifications-item']}>
          <div className={styles['card__specifications-title']}>Screen</div>

          <div className={styles['card__specifications-params']}>5.8” OLED</div>
        </div>

        <div className={styles['card__specifications-item']}>
          <div className={styles['card__specifications-title']}>Capacity</div>

          <div className={styles['card__specifications-params']}>64 GB</div>
        </div>

        <div className={styles['card__specifications-item']}>
          <div className={styles['card__specifications-title']}>RAM</div>

          <div className={styles['card__specifications-params']}>4 GB</div>
        </div>
      </div>
      <div className={styles.card__buttons}>
        <Button />
        <AddToFavourites />
      </div>
    </div>
  );
};
