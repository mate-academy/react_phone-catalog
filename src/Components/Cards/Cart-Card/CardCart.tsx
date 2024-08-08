import React, { useState, useEffect } from 'react';
import styles from './CardCart.module.scss';
import { CartsProducts } from '../../../type/Carts';

type Props = {
  item: CartsProducts;
  onCountChange: (item: CartsProducts) => void;
  onDelete: (item: CartsProducts) => void;
};

export const CardCart: React.FC<Props> = ({
  item,
  onCountChange,
  onDelete,
}) => {
  const [totalPrice, setTotalPrice] = useState(item.fullPrice);

  useEffect(() => {
    const newTotalPrice = item.fullPrice * item.count;

    setTotalPrice(newTotalPrice);
  }, [item.count, item.fullPrice]);

  const increment = () => {
    const updateItem = { ...item, count: item.count + 1 };

    if (item !== updateItem) {
      onCountChange(updateItem);
    }
  };

  const decrement = () => {
    const updateItem = { ...item, count: item.count - 1 };

    if (item !== updateItem) {
      onCountChange(updateItem);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.imgBlock}>
        <button className={styles.button} onClick={() => onDelete(item)}>
          X
        </button>
        <div className={styles.image}>
          <img src={`${item.image}`} alt="#" />
        </div>
        <div className={styles.name}>
          <h3>{`${item.name}`}</h3>
        </div>
      </div>
      <div className={styles.worthBlock}>
        <div className={styles.counter}>
          <button onClick={decrement} disabled={item.count > 1 ? false : true}>
            –
          </button>
          <div>{item.count}</div>
          <button onClick={increment}>+</button>
        </div>
        <div className={styles.sum}>
          <h1>{`$${totalPrice}`}</h1>
        </div>
      </div>
    </div>
  );
};
