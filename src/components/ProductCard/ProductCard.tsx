import React from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

import { Product } from '../../types';
import { DISCOUNT_THRESHOLD } from '../../constants';

import { AddToCartButton } from '../AddToCartButton';
import { AddToFavoritesButton } from '../AddToFavoritesButton';

import styles from './ProductCard.module.scss';

type Props = {
  product: Product;
  className?: string;
  draggable?: boolean;
  isClickable?: boolean;
};

export const ProductCard: React.FC<Props> = ({
  product,
  className = '',
  draggable = true,
  isClickable = true,
}) => {
  const {
    fullPrice,
    price,
    image,
    name,
    screen,
    capacity,
    ram,
    category,
    itemId,
  } = product;

  const discountPercentage = ((fullPrice - price) * 100) / fullPrice;
  const hasBigDiscount = discountPercentage >= DISCOUNT_THRESHOLD;

  const handleLinkClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (!isClickable) {
      event.preventDefault();

      return;
    }

    window.scrollTo(0, 0);
  };

  const linkTo = `/${category}/${itemId}`;

  return (
    <article className={classNames(styles['product-card'], className)}>
      <Link
        to={linkTo}
        className={styles['product-card__img-container']}
        draggable={draggable}
        onClick={handleLinkClick}
      >
        <img
          src={image}
          alt={name}
          className={styles['product-card__img']}
          draggable={draggable}
        />
      </Link>

      <Link
        to={linkTo}
        className={styles['product-card__title']}
        draggable={draggable}
        onClick={handleLinkClick}
      >
        {name}
      </Link>

      <div className={styles['product-card__prices']}>
        <strong className={styles['product-card__price']}>
          {`$${hasBigDiscount ? price : fullPrice}`}
        </strong>

        {hasBigDiscount && (
          <span
            className={classNames(
              styles['product-card__price'],
              styles['product-card__price--discount'],
            )}
          >
            {`$${fullPrice}`}
          </span>
        )}
      </div>

      <span className={styles['product-card__decor']} />

      <ul className={styles['product-card__specs']}>
        <li className={styles['product-card__spec']}>
          <span>Screen</span>
          <span>{screen}</span>
        </li>
        <li className={styles['product-card__spec']}>
          <span>Capacity</span>
          <span>{capacity}</span>
        </li>
        <li className={styles['product-card__spec']}>
          <span>RAM</span>
          <span>{ram}</span>
        </li>
      </ul>

      <div className={styles['product-card__buttons']}>
        <AddToCartButton
          productId={itemId}
          isClickable={isClickable}
          className={styles['product-card__cart-btn']}
        />
        <AddToFavoritesButton productId={itemId} isClickable={isClickable} />
      </div>
    </article>
  );
};
