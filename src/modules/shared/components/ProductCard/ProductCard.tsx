import { Link } from 'react-router-dom';
import styles from './ProductCard.module.scss';
import { Button } from '../Button';
import { AddToFavourites } from '../AddToFavourites';
import { useContext } from 'react';
import { PhoneContext } from '../../utils/context';

export const ProductCard = () => {
  const phones = useContext(PhoneContext);

  return phones?.map(phone => {
    return (
      <div key={phone.id} className={styles.card}>
        <Link to={'/'}>
          <img
            className={styles.card__image}
            src={phone.images[0]}
            loading="lazy"
          ></img>
        </Link>
        <Link className={styles.card__title} to={'/'}>
          {phone.name}
        </Link>
        <div className={styles.card__price}>
          <p className={styles['card__price-current']}>
            ${phone.priceDiscount}
          </p>
          <p className={styles['card__price-before']}>${phone.priceRegular}</p>
        </div>
        <div className={styles.card__divider}></div>
        <div className={styles.card__specifications}>
          <div className={styles['card__specifications-item']}>
            <div className={styles['card__specifications-title']}>Screen</div>

            <div className={styles['card__specifications-params']}>
              {phone.screen}
            </div>
          </div>

          <div className={styles['card__specifications-item']}>
            <div className={styles['card__specifications-title']}>Capacity</div>

            <div className={styles['card__specifications-params']}>
              {phone.capacity}
            </div>
          </div>

          <div className={styles['card__specifications-item']}>
            <div className={styles['card__specifications-title']}>RAM</div>

            <div className={styles['card__specifications-params']}>
              {phone.ram}
            </div>
          </div>
        </div>
        <div className={styles.card__buttons}>
          <Button />
          <AddToFavourites />
        </div>
      </div>
    );
  });
};
