import React, { memo } from 'react';
import styles from './Card.module.scss';
import { Link, useSearchParams } from 'react-router-dom';
import { Product } from '../../types';
import Button from '../Button';
import IconButton from '../IconButton';

type Props = {
  item: Product;
  isHideFullPrice?: boolean;
};

const Card: React.FC<Props> = memo(({ item, isHideFullPrice = false }) => {
  const [searchParams] = useSearchParams();

  return (
    <article className={styles.card}>
      <Link
        to={`/${item.category}/${item.itemId}`}
        state={{ search: searchParams.toString() }}
        className={styles.card__img}
      >
        <img src={item.image} alt={item.name} />
      </Link>
      <Link
        to={`/${item.category}/${item.itemId}`}
        state={{ search: searchParams.toString() }}
        className={styles.card__name}
      >
        {item.name}
      </Link>
      <h3 className={styles.card__price}>${item.price}</h3>
      {!isHideFullPrice && (
        <h3 className={styles.card__oldprice}>${item.fullPrice}</h3>
      )}
      <span className={styles.card__line}></span>
      <div className={styles.card__description}>
        <div className={styles.card__info}>
          <span className={styles.card__key}>Sceen</span>
          <span className={styles.card__value}>{item.screen}</span>
        </div>
        <div className={styles.card__info}>
          <span className={styles.card__key}>Capacity</span>
          <span className={styles.card__value}>{item.capacity}</span>
        </div>
        <div className={styles.card__info}>
          <span className={styles.card__key}>RAM</span>
          <span className={styles.card__value}>{item.ram}</span>
        </div>
      </div>
      <Button item={item} />
      <IconButton item={item} />
    </article>
  );
});

export default Card;

Card.displayName = 'Card';
