import { Link, useParams } from 'react-router-dom';
import styles from './ProductCard.module.scss';
import { Button } from '../Button';
import { AddToFavourites } from '../AddToFavourites';

type Props = {
  name: string;
  images: string;
  priceDiscount: number | undefined;
  priceRegular: number;
  screen: string;
  capacity: string;
  ram: string;
  id: string;
  category: string;
};

export const ProductCard = ({
  name,
  images,
  priceDiscount,
  priceRegular,
  screen,
  ram,
  capacity,
  id,
  category,
}: Props) => {
  const { productId } = useParams();

  // eslint-disable-next-line no-console
  console.log(productId);

  return (
    <div className={styles.card}>
      <Link to={`/${category}/${id}`}>
        <img className={styles.card__image} src={images} loading="lazy"></img>
      </Link>
      <Link className={styles.card__title} to={`/${category}/${id}`}>
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
        <Button text={'Add to cart'} />
        <AddToFavourites />
      </div>
    </div>
  );
};
