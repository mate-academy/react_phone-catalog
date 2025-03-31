import { Link } from 'react-router-dom';
import { ProductType } from 'types/productTypes';
import { HeartIcon } from '@components/Icons/HeartIcon';
import { PrimaryButton } from '@components/Buttons/PrimaryButton';

import React from 'react';
import cn from 'classnames';
import styles from './ProductCard.module.scss';

interface ProductCardProps {
  card: ProductType;
  hideOldPrice?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  card,
  hideOldPrice = false,
}) => {
  const {
    name,
    price,
    fullPrice,
    screen,
    capacity,
    ram,
    image,
    itemId,
    category,
  } = card;

  return (
    <div className={styles.card}>
      <Link to={`/${category}/${itemId}`} className={styles.card__image}>
        <img src={image} alt={name} />
      </Link>
      <Link to={`/${category}/${itemId}`}>
        <h5 className={styles.card__title}>{name}</h5>
      </Link>
      <div className={cn(styles.card__price, 'three-title')}>
        <p className={styles.card__price_new}>${price}</p>
        {!hideOldPrice && (
          <span className={styles.card__price_old}>${fullPrice}</span>
        )}
      </div>

      <span className={styles.card__decor_line}></span>

      <ul className={styles.card__details}>
        <li className={styles.card__details_item}>
          <p className={styles.card__details_item__name}>Screen</p>
          <span>{screen}</span>
        </li>
        <li className={styles.card__details_item}>
          <p className={styles.card__details_item__name}>Capacity</p>
          <span>{capacity}</span>
        </li>
        <li className={styles.card__details_item}>
          <p className={styles.card__details_item__name}>RAM</p>
          <span>{ram}</span>
        </li>
      </ul>

      <div className={styles.card__buttons}>
        <PrimaryButton
          mainText="Add to cart"
          selectedText="Added"
          onClick={() => {}}
          isSelected={false}
        />
        <button className={cn(styles.card__buttons_heart, 'button-icon')}>
          <HeartIcon />
        </button>
      </div>
    </div>
  );
};
