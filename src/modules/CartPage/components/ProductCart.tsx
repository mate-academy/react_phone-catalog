import styles from './ProductCart.module.scss';
import { Link, useLocation } from 'react-router-dom';
import React from 'react';
import { CartBtnType } from '../../../types/CartBtnType';
import classNames from 'classnames';
import { CartProduct } from '../../../types/Context';

interface Props {
  cartProduct: CartProduct;
  handleCart: (cartBtnType: CartBtnType, productId: string) => void;
}

export const ProductCart: React.FC<Props> = ({
  cartProduct: { id, quantity, product },
  handleCart,
}) => {
  const { state } = useLocation();
  const { category, images, name } = product;

  return (
    <article className={styles.cartProductContainer}>
      <div className={styles.topWrapper}>
        <button
          onClick={() => handleCart(CartBtnType.delete, id)}
          className={styles.btnClose}
        ></button>
        <Link
          to={`/${category}/${id}`}
          state={state}
          className={styles.productContainer}
        >
          <div className={styles.imgContainer}>
            <img src={images[0]} alt={name} />
          </div>
          <p className={styles.productName}>{name}</p>
        </Link>
      </div>
      <div className={styles.bottomWrapper}>
        <div className={styles.counterContainer}>
          <button
            className={classNames(styles.btnCounter, styles.btnCounterMinus)}
            onClick={() => handleCart(CartBtnType.subtract, id)}
            disabled={quantity === 1}
          ></button>
          <span className={styles.textCounter}>{quantity}</span>
          <button
            className={classNames(styles.btnCounter, styles.btnCounterPlus)}
            onClick={() => handleCart(CartBtnType.add, id)}
          ></button>
        </div>
      </div>
    </article>
  );
};
