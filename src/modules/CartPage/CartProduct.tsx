import React, { useState } from 'react';
import styles from './CartProduct.module.scss';
import { Card } from '../../types/Card';
import { useAppDispatch, useAppState } from '../../contexts/AppContext';
import { Link } from 'react-router-dom';
import { CartProductSkeleton } from './CartProductSkeleton';

type CartProductProps = {
  product: Card | undefined;
  onProductCountChange: (price: number, action: '+' | '-') => void;
};

export const CartProduct: React.FC<CartProductProps> = ({ product, onProductCountChange }) => {
  const { cartProductsIds, theme } = useAppState();
  const { setCartProductsIds } = useAppDispatch();
  const [counterValue, setCounterValue] = useState<number>(1);

  function handleCounterChange(event: React.MouseEvent<HTMLButtonElement>, action: '+' | '-') {
    event.stopPropagation();
    event.preventDefault();

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

  function handleDeleteProductFromCart(event: React.MouseEvent<HTMLButtonElement>, id: string) {
    event.stopPropagation();
    event.preventDefault();

    const updatedCart = cartProductsIds.filter(
      (productId: string) => productId !== id,
    );
    setCartProductsIds(updatedCart);
  }

  return product !== undefined ? (
    <Link
      to={`/${product.category}/${product.itemId}`}
      className={styles.product}
    >
      <div className={styles.details}>
        <button
          onClick={(event) => handleDeleteProductFromCart(event, product.itemId)}
          className={`
            ${styles.img} 
            ${styles.close}
            ${theme === 'light' ? styles.closeLight : styles.closeDark}
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
            onClick={(event) => handleCounterChange(event, '-')}
          >
            <img
              className={styles.img}
              src={`/img/icons/${theme}-theme/Minus${counterValue === 1 ? '-disabled' : ''}.svg`}
              alt="Minus"
            />
          </button>

          <div className={`${styles.value} bodyText`}>{counterValue}</div>

          <button
            className={styles.counterButton}
            onClick={(event) => handleCounterChange(event, '+')}
          >
            <img className={styles.img} src={`/img/icons/${theme}-theme/Plus.svg`} alt="Plus" />
          </button>
        </div>
        <h3 className={styles.priceTitle}>${product.price * counterValue}</h3>
      </div>
    </Link>
  ) : <CartProductSkeleton />
};
