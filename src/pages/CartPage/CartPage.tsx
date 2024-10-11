import { useContext } from 'react';
import { CartContext } from '../../context/CartContext';
import { GoBack } from '../../components/GoBack';
import styles from './CartPage.module.scss';
import { Title } from '../../components/Title';
import { CartIsEmpty } from '../../components/CartIsEmpty';
import { CartProduct } from '../../components/CartProduct';
import {
  calculateTotalAmount,
  calculateTotalPrice,
} from '../../utils/functions';
import { CheckoutButton } from '../../components/CheckoutButton';
import { CartItem } from '../../utils/types';

export const CartPage = () => {
  const { cart } = useContext(CartContext);

  return (
    <div className={styles.cartPage}>
      <div className={styles.cartPage__goback}>
        <img src="../src/img/icons/arrow_left_black.png" alt="arrow icon" />
        <GoBack> Back </GoBack>
      </div>
      <div className={styles.cartPage__title}>
        <Title level={1}>Cart</Title>
      </div>

      {cart.length === 0 && <CartIsEmpty />}

      {cart.length > 0 && (
        <div className={styles.cartPage__container}>
          <div className={styles.cartPage__items}>
            {cart.map((cartItem: CartItem) => (
              <CartProduct key={cartItem.id} cartProduct={cartItem} />
            ))}
          </div>
          <div className={styles.cartPage__total}>
            <div style={{ textAlign: 'center' }}>
              <Title level={2}>{'$' + calculateTotalPrice(cart)}</Title>
              <p
                className={styles.cartPage__totalItems}
              >{`Total for ${calculateTotalAmount(cart)} items`}</p>
            </div>
            <div className={styles.cartPage__line}></div>
            <CheckoutButton />
          </div>
        </div>
      )}
    </div>
  );
};
