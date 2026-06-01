import React from 'react';
import styles from './Errors.module.scss';

type ErrorType =
  | 'fetch-error'
  | 'empty'
  | 'empty-cart'
  | 'empty-favorites'
  | 'not-found';

const config = {
  'fetch-error': {
    img: 'img/error/page-not-found.png',
    title: 'Network crash',
    subtitle: 'Try again later and check your connection',
  },

  empty: {
    img: 'img/error/product-not-found.png',
    title: 'This item is out of stock',
    subtitle:
      // eslint-disable-next-line max-len
      'Unfortunately, these items are currently unavailable. Please contact a representative at “phone” for more details.',
  },

  'empty-cart': {
    img: 'img/error/cart-is-empty.png',
    title: 'Your cart is empty',
    subtitle: `If you'd like to buy something, it will appear here`,
  },

  'empty-favorites': {
    img: 'img/error/favorites-is-empty.png',
    title: 'No items in your favorites',
    subtitle: `If you like something, it's sure to be here`,
  },

  'not-found': {
    img: 'img/error/page-not-found.png',
    title: 'Page not found',
    subtitle: 'The page you are looking for does not exist',
  },
};

type Props = {
  type: ErrorType;
};

export const Errors = ({ type }: Props) => {
  const { img, title, subtitle } = config[type];

  return (
    <article className={styles.errors}>
      <div className={styles.title}>{title}</div>
      <img className={styles.img} src={img} alt={title} />
      <div className={styles.subtitle}>{subtitle}</div>
    </article>
  );
};
