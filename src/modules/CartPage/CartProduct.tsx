import React, { useEffect, useState } from 'react';
import styles from './CartProduct.module.scss';
import { Card } from '../../types/Card';
import { useAppDispatch, useAppState } from '../../Context/AppContext';
import { Link } from 'react-router-dom';
import { CartProductSkeleton } from './CartProductSkeleton';
import { saveCartProducts } from '../Base/services/LocalStorage';
import { Close } from '../../components/Close';

type CartProductProps = {
  product: Card | undefined;
  onProductCountChange: (price: number, action: '+' | '-') => void;
};

export const CartProduct: React.FC<CartProductProps> = ({
  product,
  onProductCountChange,
}) => {
  const { cartProducts, theme } = useAppState();
  const { setCartProducts } = useAppDispatch();
  const [counterValue, setCounterValue] = useState<number>(
    product ? cartProducts[product.itemId] : 1,
  );

  function handleCounterChange(
    event: React.MouseEvent<HTMLButtonElement>,
    action: '+' | '-',
  ) {
    event.stopPropagation();
    event.preventDefault();

    if (action === '+') {
      onProductCountChange(product!.price, '+');
      setCounterValue(prev => prev + 1);
      setCartProducts(prev => {
        const updated = { ...prev, [product!.itemId]: counterValue + 1 };

        saveCartProducts(updated);

        return updated;
      });

      return;
    }

    if (counterValue === 1) {
      return;
    }

    onProductCountChange(product!.price, '-');
    setCounterValue(prev => prev - 1);
    setCartProducts(prev => {
      const updated = { ...prev, [product!.itemId]: counterValue - 1 };

      saveCartProducts(updated);

      return updated;
    });
  }

  function handleDeleteProductFromCart(
    event: React.MouseEvent<HTMLButtonElement>,
    id: string,
  ) {
    event.stopPropagation();
    event.preventDefault();

    const updatedCart = { ...cartProducts };

    delete updatedCart[id];
    setCartProducts(updatedCart);
  }

  useEffect(() => {
    if (product === undefined) {
      return;
    }

    setCounterValue(cartProducts[product.itemId]);
  }, [product, cartProducts]);

  return product !== undefined ? (
    <Link
      to={`/${product.category}/${product.itemId}`}
      className={styles.product}
    >
      <div className={styles.details}>
        <Close
          onClick={(event: React.MouseEvent<HTMLButtonElement>) =>
            handleDeleteProductFromCart(event, product.itemId)
          }
        />
        <div className={styles.wrapper}>
          <img className={styles.image} src={product.image} alt="Product" />
        </div>

        <div className={`${styles.name} bodyText`}>{product.name}</div>
      </div>

      <div className={styles.price}>
        <div className={styles.counter}>
          <button
            className={`
              ${styles.counterButton}
              ${counterValue === 1 && styles.disabled}
            `}
            onClick={event => handleCounterChange(event, '-')}
          >
            <img
              className={styles.img}
              src={`./img/icons/${theme}-theme/Minus${counterValue === 1 ? '-disabled' : ''}.svg`}
              alt="Minus"
            />
          </button>

          <div className={`${styles.value} bodyText`}>{counterValue}</div>

          <button
            className={styles.counterButton}
            onClick={event => handleCounterChange(event, '+')}
          >
            <img
              className={styles.img}
              src={`./img/icons/${theme}-theme/Plus.svg`}
              alt="Plus"
            />
          </button>
        </div>
        <h4 className={styles.priceTitle}>${product.price * counterValue}</h4>
      </div>
    </Link>
  ) : (
    <CartProductSkeleton />
  );
};
