import styles from './CartProduct.module.scss';
import { Link, useLocation } from 'react-router-dom';
import { Product } from '../../../types/Product';
import React, { useState } from 'react';
import { CartBtnType } from '../../../types/CartBtnType';
// import { CartContext } from '../../../ContextProvider';
import classNames from 'classnames';

interface Props {
  product: Product;
  handleCart: (cartBtnType: CartBtnType, productId: string) => void;
}

export const CartProduct: React.FC<Props> = ({
  product: { id, name, category, images },
  handleCart,
}) => {
  const [counter, setCounter] = useState(1);
  // const { cartProducts } = useContext(CartContext);
  const { state } = useLocation();

  // const numOfItems = cartProducts.filter(item => item.id === id).length;

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
            onClick={() => setCounter(prevCounter => prevCounter - 1)}
            disabled={counter === 1}
          ></button>
          <span className={styles.textCounter}>{counter}</span>
          <button
            className={classNames(styles.btnCounter, styles.btnCounterPlus)}
            onClick={() => setCounter(prevCounter => prevCounter + 1)}
          ></button>
        </div>
      </div>
    </article>
  );
};
