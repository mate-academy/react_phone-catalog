import React, { useState } from 'react';
import styles from './CartProduct.module.scss';
import { Card } from '../../types/Card';
import { useAppContext } from '../../contexts/AppContext';

type CartProductProps = {
  product: Card;
};

export const CartProduct: React.FC<CartProductProps> = ({ product }) => {
  const { cartProductsIds, generateProductCode, setCartProductsIds } =
    useAppContext();
  const [counterValue, setCounterValue] = useState<number>(1);

  function handleCounterChange(action: '+' | '-') {
    if (action === '+') {
      setCounterValue(prev => prev + 1);
      return;
    }

    if (counterValue === 1) {
      return;
    }

    setCounterValue(prev => prev - 1);
  }

  function handleDeleteProductFromCart(id: number) {
    const updatedCart = cartProductsIds.filter(
      (productId: number) => productId !== id,
    );
    setCartProductsIds(updatedCart);
  }

  return (
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
          {generateProductCode(product.name)}
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
  );
};
