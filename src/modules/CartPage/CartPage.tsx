import React from 'react';
import { useTranslation } from 'react-i18next';
import { useCart } from '../shared/context/CartContext';
import styles from './CartPage.module.scss';
import { Button } from '../../components/UI/Button/Button';
import { Breadcrumbs } from '../../components/Breadcrumbs/Breadcrumbs';
import { BackButton } from '../../components/BackButton/BackButton';

export const CartPage: React.FC = () => {
  const { t } = useTranslation();
  const { cart, removeFromCart, updateQuantity } = useCart();

  const total = cart.reduce(
    (sum, item) =>
      sum +
      // eslint-disable-next-line max-len
      (item.product?.priceDiscount ?? item.product?.fullPrice ?? 0) *
        item.quantity,
    0,
  );

  return (
    <div className={styles.cart}>
      <Breadcrumbs />
      <BackButton />
      <h1>{t('cart')}</h1>
      {cart.length === 0 ? (
        <div className={styles.emptyCart}>
          <img
            src="/img/cart-is-empty.png"
            alt={t('cartEmpty')}
            className={styles.emptyImage}
          />
        </div>
      ) : (
        <>
          <ul className={styles.items}>
            {cart.map(item => (
              <li key={item.id} className={styles.item}>
                <img
                  src={item.product.images[0]}
                  alt={item.product.name}
                  className={styles.image}
                />
                <div className={styles.details}>
                  <h3>{item.product.name}</h3>
                  <p>
                    ${item.product.priceDiscount ?? item.product.fullPrice} x
                    {item.quantity}
                  </p>
                  <input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={e =>
                      updateQuantity(item.id, Number(e.target.value))
                    }
                    className={styles.quantity}
                  />
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => removeFromCart(item.id)}
                  >
                    Remove
                  </Button>
                </div>
              </li>
            ))}
          </ul>
          <div className={styles.summary}>
            <p>Total: ${total.toFixed(2)}</p>
            <Button variant="primary" size="md">
              Checkout
            </Button>
          </div>
        </>
      )}
    </div>
  );
};
