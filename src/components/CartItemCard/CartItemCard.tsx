import React from 'react';
import styles from './CartItemCard.module.scss';
import { useDispatch } from 'react-redux';
import { removeFromCart, updateQuantity } from '../../store/cartSlice';
import { Product } from '../../types/Product';

type Props = {
  product: Product;
  quantity: number;
};

export const CartItemCard: React.FC<Props> = ({ product, quantity }) => {
  const dispatch = useDispatch();

  const handleRemove = () => {
    dispatch(removeFromCart(product.id));
  };

  const changeQuantity = (value: number) => {
    if (value < 1) {
      return;
    }

    dispatch(updateQuantity({ id: product.id, quantity: value }));
  };

  return (
    <div className={styles.card}>
      <img src={product.image} alt={product.name} className={styles.image} />

      <div className={styles.info}>
        <p className={styles.name}>{product.name}</p>
        <p className={styles.price}>${product.priceDiscount * quantity}</p>

        <div className={styles.controls}>
          <button onClick={() => changeQuantity(quantity - 1)}>-</button>
          <span>{quantity}</span>
          <button onClick={() => changeQuantity(quantity + 1)}>+</button>
        </div>
      </div>

      <button onClick={handleRemove} className={styles.remove}>
        ✕
      </button>
    </div>
  );
};
