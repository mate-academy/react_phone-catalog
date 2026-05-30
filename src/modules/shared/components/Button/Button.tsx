import React from 'react';
import { useProducts } from '../../context/productsContext';
import classNames from 'classnames';
import styles from './Button.module.scss';
import { Product } from '../../types';

type Props = {
  item: Product;
  isBig?: boolean;
};

const Button: React.FC<Props> = ({ item, isBig = false }) => {
  const { cartProducts, setCartProducts } = useProducts();
  const isAdded = cartProducts.find(product => product.id === item.id);

  const storeProducts = () => {
    if (!isAdded) {
      setCartProducts(prev => [...prev, item]);

      const storedData = localStorage.getItem('totalBill');
      const existingData: Record<string, number> = storedData
        ? JSON.parse(storedData)
        : {};

      const updatedData = { ...existingData, [item.id]: 1 };

      localStorage.setItem('totalBill', JSON.stringify(updatedData));
    }
  };

  return (
    <button
      onClick={storeProducts}
      className={classNames(styles.button, {
        [styles.button_active]: isAdded,
        [styles.button_big]: isBig,
      })}
    >
      {isAdded ? 'Added' : 'Add to cart'}
    </button>
  );
};

export default Button;
