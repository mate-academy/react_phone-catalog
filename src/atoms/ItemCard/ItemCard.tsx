import { Button } from '@/atoms';
import s from './ItemCard.module.scss';
import Heart from '@/assets/icons/heart.svg?react';

import { FC } from 'react';
import { Good } from '@/types';

type Props = {
  item: Good;
  discount?: boolean;
};

const ItemCard: FC<Props> = ({ item, discount = false }) => {
  const { images, name, priceRegular, screen, capacity, ram, priceDiscount } =
    item;

  return (
    <article className={s.card}>
      <img className={s.card__img} src={images[0]} alt={name} />
      <div className={s.card__footer}>
        <h3 className={s.card__name}>{name}</h3>
        {discount ? (
          <div className={s.card__price}>
            <p className={s.card__priceRegular}>${priceDiscount}</p>
            <p className={s.card__priceDiscount}>${priceRegular}</p>
          </div>
        ) : (
          <p className={s.card__priceRegular}>${priceRegular}</p>
        )}
        <div className={s.card__br} />
        <dl className={s.card__specs}>
          <div className={s.card__stat}>
            <dt className={s.card__stat__Name}>Screen</dt>
            <dd className={s.card__stat__Info}>{screen}</dd>
          </div>
          <div className={s.card__stat}>
            <dt className={s.card__stat__Name}>Capacity</dt>
            <dd className={s.card__stat__Info}>{capacity}</dd>
          </div>
          <div className={s.card__stat}>
            <dt className={s.card__stat__Name}>Ram</dt>
            <dd className={s.card__stat__Info}>{ram}</dd>
          </div>
        </dl>
        <div className={s.card__footer__controls}>
          <Button classNames={s.button__cart} variant="primary">
            Add to cart
          </Button>
          <Button
            variant="secondary"
            classNames={s.button__like}
            aria-label="Add to favorites"
          >
            <Heart />
          </Button>
        </div>
      </div>
    </article>
  );
};

export default ItemCard;
