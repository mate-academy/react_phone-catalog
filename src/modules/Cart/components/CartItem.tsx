import React, { useState } from 'react';
import styles from './CartItem.module.scss';
import { Products } from '../../../types/Products';
import minus from '../../../../public/img/icons/Minus.svg';
import plus from '../../../../public/img/icons/Plus.svg';
import closeBlack from '../../../../public/img/icons/icon-close-black.svg';
import { Link } from 'react-router-dom';

type Props = {
  product: Products;
  toggleCartItem: (productId: number) => void;
  setTotalPrice: React.Dispatch<React.SetStateAction<number>>;
  updateCartQuantity: (productId: number, quantity: number) => void;
  quantity: number;
};

export const CartItem: React.FC<Props> = ({
  product,
  toggleCartItem,
  setTotalPrice,
  updateCartQuantity,
  quantity,
}) => {
  const link = `/${product.category}/${product.itemId}`;
  const initialPrice = product.price || product.fullPrice;
  const [count, setCount] = useState(quantity);

  const handleIncrement = () => {
    if (count < 10) {
      setCount(prev => {
        const qnt = prev + 1;

        const total = qnt * initialPrice - initialPrice;

        setTotalPrice(totalPrice => totalPrice + total);

        updateCartQuantity(product.id, qnt);

        return qnt;
      });
    }
  };

  const handleDecrement = () => {
    if (count > 1) {
      setCount(prev => {
        const qnt = prev - 1;

        setTotalPrice(totalPrice => totalPrice - initialPrice);

        updateCartQuantity(product.id, qnt);

        return qnt;
      });
    }
  };

  return (
    <div className={styles['cart-item']}>
      <div className={styles['cart-item__container']}>
        <div className={`${styles['cart-item__left']} ${styles.left}`}>
          <div
            className={styles.left__close}
            onClick={() => toggleCartItem(product.id)}
          >
            <img src={closeBlack} alt="icon-close" />
          </div>
          <Link to={link}>
            <div className={styles.left__image}>
              <img src={product.image} alt="device" />
            </div>
          </Link>

          <Link to={link}>
            <div className={styles.left__title}>{product.name}</div>
          </Link>
        </div>
        <div className={`${styles['cart-item__right']} ${styles.counter}`}>
          <div className={styles.counter__wrapper}>
            <div
              className={styles.counter__decrement}
              onClick={handleDecrement}
            >
              <img src={minus} alt="icon-minus" />
            </div>
            <div className={styles.counter__number}>{count}</div>
            <div
              className={styles.counter__increment}
              onClick={handleIncrement}
            >
              <img src={plus} alt="icon-plus" />
            </div>
          </div>

          <div className={styles.counter__price}>
            ${initialPrice * quantity}
          </div>
        </div>
      </div>
    </div>
  );
};
