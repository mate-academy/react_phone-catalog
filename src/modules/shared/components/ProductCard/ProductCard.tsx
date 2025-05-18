import { Link } from 'react-router-dom';
import styles from './ProductCard.module.scss';
import { Button } from '../Button';
import { AddToFavourites } from '../AddToFavourites';

type Props = {
  name: string;
  images: string[];
  priceDiscount: number | undefined;
  priceRegular: number;
  screen: string;
  capacity: string;
  ram: string;
};

export const ProductCard = ({
  name,
  images,
  priceDiscount,
  priceRegular,
  screen,
  ram,
  capacity,
}: Props) => {
  return (
    <div className={styles.card}>
      <Link to={'/'}>
        <img
          className={styles.card__image}
          src={images[0]}
          loading="lazy"
        ></img>
      </Link>
      <Link className={styles.card__title} to={'/'}>
        {name}
      </Link>
      <div className={styles.card__price}>
        <p className={styles['card__price-current']}>${priceDiscount}</p>
        <p className={styles['card__price-before']}>${priceRegular}</p>
      </div>
      <div className={styles.card__divider}></div>
      <div className={styles.card__specifications}>
        <div className={styles['card__specifications-item']}>
          <div className={styles['card__specifications-title']}>Screen</div>

          <div className={styles['card__specifications-params']}>{screen}</div>
        </div>

        <div className={styles['card__specifications-item']}>
          <div className={styles['card__specifications-title']}>Capacity</div>

          <div className={styles['card__specifications-params']}>
            {capacity}
          </div>
        </div>

        <div className={styles['card__specifications-item']}>
          <div className={styles['card__specifications-title']}>RAM</div>

          <div className={styles['card__specifications-params']}>{ram}</div>
        </div>
      </div>
      <div className={styles.card__buttons}>
        <Button />
        <AddToFavourites />
      </div>
    </div>
  );
};
