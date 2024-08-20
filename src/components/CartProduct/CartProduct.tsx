import React, { useContext, useState } from 'react';
import styles from './CartProduct.module.scss';
import { Product } from '../../types/Product';
import { BASE_URL } from '../../utils/const';
import { ProductContext } from '../../context/ProductContext';

interface Props {
  product: Product;
  quantity: number;
}

const CartProduct: React.FC<Props> = ({ product, quantity }) => {
  const [productPrice] = useState(product.price);
  const [counter, setCounter] = useState(quantity);

  const { removeFromCart, updateCart } = useContext(ProductContext);

  const increase = () => {
    setCounter(current => {
      const newCounter = current + 1;

      updateCart(product.id, newCounter);

      return newCounter;
    });
  };

  const decrease = () => {
    setCounter(current => {
      if (current > 1) {
        const newCounter = current - 1;

        updateCart(product.id, newCounter);

        return newCounter;
      }

      return current;
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.top}>
          <button
            className={styles.remove}
            onClick={() => removeFromCart(product.id)}
          >
            <img src={`${BASE_URL}/icons/Close.svg`} alt="Delete" />
          </button>
          <img
            src={product.image}
            alt={product.name}
            className={styles.image}
          />
          <p className={styles.name}>{product.name}</p>
        </div>

        <div className={styles.bottom}>
          <div className={styles.counter}>
            <button className={styles.action} onClick={decrease}>
              <img src={`${BASE_URL}/icons/Minus.svg`} alt="Minus" />
            </button>
            <span className={styles.count}>{counter}</span>
            <button className={styles.action} onClick={increase}>
              <img src={`${BASE_URL}/icons/Plus.svg`} alt="Plus" />
            </button>
          </div>
          <p className={styles.productPrice}>{`$${productPrice}`}</p>
        </div>
      </div>
    </div>
  );
};

export default CartProduct;
