import React from 'react';
import { Product } from '../../types/Product';
import styles from './ItemInCart.module.scss';
import { useAppDispatch } from '../../app/hooks';
import cartSlice from '../../features/cart/cartSlice';

type Props = {
  product: Product;
};

export const ItemInCart: React.FC<Props> = ({ product }) => {
  const dispatch = useAppDispatch();

  const onDelete = (id: number) => {
    dispatch(cartSlice.actions.deleteFromCart(id));
  };

  const onAddQuantity = (id: number) => {
    dispatch(cartSlice.actions.onAddQuantity(id));
  };

  const onDescQuantity = (id: number) => {
    dispatch(cartSlice.actions.descQuantity(id));
  };

  return (
    <div className={styles.container}>
      <div className={styles.main}>
        <button
          className={styles.deleteButton}
          onClick={() => onDelete(product.id)}
        >
          <img src="/react_phone-catalog/img/servic/close.svg" alt="close" />
        </button>
        <div className={styles.image}>
          <img src={product.image} alt="image" />
        </div>
        <p className={styles.name}>{product.name}</p>
      </div>
      <div className={styles.quantityContainer}>
        <div className={styles.count}>
          <button
            className={
              product.quantity === 1
                ? `${styles.button} ${styles.disabled}`
                : styles.button
            }
            onClick={() => onDescQuantity(product.id)}
            disabled={product.quantity === 1}
          >
            -
          </button>
          <p>{product.quantity}</p>
          <button
            className={styles.button}
            onClick={() => onAddQuantity(product.id)}
          >
            +
          </button>
        </div>
        <h3>${product.totalPrice}</h3>
      </div>
    </div>
  );
};
