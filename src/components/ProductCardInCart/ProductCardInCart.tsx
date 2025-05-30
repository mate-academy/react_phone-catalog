import React from 'react';

import { VITE_BASE_URL } from '../../utils/fetchClient';
import { ExtendedProduct } from '../../types/Product';

import { NavLink } from 'react-router-dom';

import styles from './ProductCardInCart.module.scss';

type Props = {
  product: ExtendedProduct;
  amount: number;
  handleChangeAmount: (type: 'increase' | 'decrease', id: number) => number;
  handleRemoveFromCart: (id: number) => void;
};

const ProductCardInCartComponent: React.FC<Props> = ({
  product,
  amount,
  handleChangeAmount,
  handleRemoveFromCart,
}) => {
  return (
    <article
      className={`${styles['product-card']} ${styles['product-card--cart']}`}
    >
      <div className={styles['product-card__price-details-wrapper--cart']}>
        <button
          className={`button-box button--cross ${styles['product-card__delete-button--cart']}`}
          onClick={() => handleRemoveFromCart(product.id)}
        ></button>
        <NavLink
          to={`/product/${product.itemId}`}
          className={styles['product-card__image-wrapper--cart']}
        >
          <img
            className={`${styles['product-card__image']} ${styles['product-card__image--cart']}`}
            src={`${VITE_BASE_URL}/${product.image}`}
            alt="Product Photo"
          />
        </NavLink>
        <p className="main-text">{product.name}</p>
      </div>
      <div className={styles['product-card__price-details--cart']}>
        <div
          className={styles['product-card__price-details-amount-wrapper--cart']}
        >
          <button
            className="button-box button-box--sm button--arrow-left"
            onClick={() => handleChangeAmount('decrease', product.id)}
          ></button>
          <p
            className={`main-text ${styles['product-card__price-details-amount']}`}
          >
            {amount}
          </p>
          <button
            className="button-box button-box--sm button--arrow-right"
            onClick={() => handleChangeAmount('increase', product.id)}
          ></button>
        </div>
        <h3>${product?.amount && product.amount * product.price}</h3>
      </div>
    </article>
  );
};

function areEqual(prev: Props, next: Props) {
  return prev.product.id === next.product.id && prev.amount === next.amount;
}

export const ProductCardInCart = React.memo(
  ProductCardInCartComponent,
  areEqual,
);
