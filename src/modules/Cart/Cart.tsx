import React from 'react';
import { useCart } from '../CartFavContext/CartContext';
import PageHeader from '../shared/components/PageHeader/PageHeader';
import BackButton from '../shared/components/BackButton/BackButton';
import CartItemComponent from './CartItemComponent';
import styles from './Cart.module.scss';
const Cart = () => {
  const { cart } = useCart();
console.log(cart);

  return (
    <div>
      <PageHeader
        title="Cart"
        showBreadCrumbs={false}
        extraContent={<BackButton label="Back" />}
        variant="cartPage"
      />
      <div style={{ display: 'flex', gap: '20px' }}>
        <div className={styles.cartItemsList}>
          {cart.map(item => (
            <CartItemComponent key={item.id} item={item} />
          ))}
        </div>
        <div></div>
      </div>
    </div>
  );
};

export default Cart;
