import React, { useState } from 'react';
import styles from './CartProduct.module.scss';
import { Card } from '../../types/Card';
import { useAppContext } from '../../contexts/AppContext';

type CartProductProps = {
  product: Card | undefined;
  onProductCountChange: (price: number, action: '+' | '-') => void;
};

export const CartProduct: React.FC<CartProductProps> = ({ product, onProductCountChange }) => {
  const { cartProductsIds, setCartProductsIds } =
    useAppContext();
  const [counterValue, setCounterValue] = useState<number>(1);

  function handleCounterChange(action: '+' | '-') {
    if (action === '+') {
      onProductCountChange(product!.price, '+');
      setCounterValue(prev => prev + 1);
      return;
    }

    if (counterValue === 1) {
      return;
    }

    onProductCountChange(product!.price, '-');
    setCounterValue(prev => prev - 1);
  }

  function handleDeleteProductFromCart(id: number) {
    const updatedCart = cartProductsIds.filter(
      (productId: number) => productId !== id,
    );
    setCartProductsIds(updatedCart);
  }

  return product !== undefined ? (
    <div className={styles.product}>
      <div className={styles.details}>
        <button
          onClick={() => handleDeleteProductFromCart(product.id)}
          className={`
            ${styles.img} 
            ${styles.close}
          `}
        ></button>
        <div className={styles.wrapper}>
          <img className={styles.image} src={product.image} alt="Product" />
        </div>

        <div className={`${styles.name} bodyText`}>
          {product.name}
        </div>
      </div>

      <div className={styles.price}>
        <div className={styles.counter}>
          <button
            className={`
              ${styles.counterButton} 
              ${counterValue === 1 && styles.disabled}
            `}
            onClick={() => handleCounterChange('-')}
          >
            <img
              className={styles.img}
              src={`/img/icons/Minus${counterValue === 1 ? '-disabled' : ''}.svg`}
              alt="Minus"
            />
          </button>

          <div className={`${styles.value} bodyText`}>{counterValue}</div>

          <button
            className={styles.counterButton}
            onClick={() => handleCounterChange('+')}
          >
            <img className={styles.img} src="/img/icons/Plus.svg" alt="Plus" />
          </button>
        </div>
        <h3 className={styles.priceTitle}>${product.price * counterValue}</h3>
      </div>
    </div>
  ) : (
    <div className={`${styles.product} ${styles.isLoading}`}>
      <div className={styles.details}>
        <div
          className={`
            ${styles.img} 
            ${styles.close}
          `}
        ></div>
        <div className={styles.wrapper}>
          <div className={styles.image}></div>
        </div>

        <div className={styles.name}>
        </div>
      </div>

      <div className={styles.price}>
        <div className={styles.counter}>
          {/* <div
            className={`
              ${styles.counterButton} 
              ${styles.disabled}
            `}
          >
            <div
              className={styles.img}
            ></div>
          </div> */}

          <div className={styles.value}></div>

          {/* <div
            className={`
              ${styles.counterButton} 
              ${styles.disabled}
            `}
          >
            <div className={styles.img}></div>
          </div> */}
        </div>
        <div className={styles.priceTitle}></div>
      </div>
    </div>
  );
};
