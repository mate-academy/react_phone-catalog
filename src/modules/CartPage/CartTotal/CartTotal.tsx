import { useCallback } from 'react';
import { useCart } from '../../../context/CartContext';
import style from './CartTotal.module.scss';

export const CartTotal = () => {
  const { totalPrice, cartItems } = useCart();
  const totalCost = totalPrice();
  const totalItems = useCallback(
    () => cartItems.reduce((acc, item) => acc + item.quantity, 0),
    [cartItems],
  );

  const items = totalItems();

  return (
    <aside className={style.cartTotal}>
      <div className={style.cartTotal__priceContainer}>
        <h2 className={style.cartTotal__priceTitle}>{`\$${totalCost}`}</h2>
        <span
          className={style.cartTotal__totalItems}
        >{`Total for ${items} item${items === 1 ? '' : 's'}`}</span>
      </div>

      <hr className={style.cartTotal__hr} />

      <button className={style.cartTotal__checkout}>Checkout</button>
    </aside>
  );
};
