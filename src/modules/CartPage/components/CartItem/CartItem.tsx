import React, { FC, useState } from 'react';
import { Product } from '../../../shared/types';
import styles from './CartItem.module.scss';
import { useProducts } from '../../../shared/context/productsContext';
import { IoClose } from 'react-icons/io5';

type Props = {
  product: Product;
  amount: number;
  setTotal: React.Dispatch<React.SetStateAction<number>>;
  setTotalBill: React.Dispatch<React.SetStateAction<Record<string, number>>>;
};
const CartItem: FC<Props> = ({ product, setTotal, setTotalBill, amount }) => {
  const [count, setCount] = useState(amount);
  const { setCartProducts } = useProducts();

  const deleteProduct = () => {
    setCartProducts(prev => [...prev].filter(item => item.id !== product.id));
    setTotal(prev => prev - product.price * count);
    setTotalBill(prev => {
      const copy = { ...prev };

      delete copy[product.id];

      return copy;
    });
  };

  const increaseCount = () => {
    setCount(prev => prev + 1);
    setTotal(prev => prev + product.price);
    setTotalBill(prev => {
      const copy = { ...prev };

      copy[product.id] = copy[product.id] + 1;

      return copy;
    });
  };

  const decreaseCount = () => {
    setCount(prev => prev - 1);
    setTotal(prev => prev - product.price);
    setTotalBill(prev => {
      const copy = { ...prev };

      copy[product.id] = copy[product.id] - 1;

      return copy;
    });
  };

  return (
    <div className={styles.cartItem}>
      <button
        onClick={deleteProduct}
        className={styles.cartItem__delete}
      >
        <IoClose/>
      </button>
      <div className={styles.cartItem__image}>
        <img src={product.image} alt={product.name} />
      </div>
      <h4 className={styles.cartItem__name}>{product.name}</h4>
      <div className={styles.cartItem__quantity}>
        <button
          onClick={decreaseCount}
          className={styles.cartItem__quantityBtn}
          disabled={count === 1}
        >
          -
        </button>
        <span>{count}</span>
        <button
          onClick={increaseCount}
          className={styles.cartItem__quantityBtn}
        >
          +
        </button>
      </div>
      <h3 className={styles.cartItem__price}>${product.price}</h3>
    </div>
  );
};

export default CartItem;
