import React from 'react';
import { useCart } from '../../context/CartContext';
import { CartItem } from '../../components/CartItem/CartItem';
import { ButtonBack } from '../../components/ButtonBack/ButtonBack';
import style from './CartPage.module.scss';

export const CartPage: React.FC = () => {
  const { cart, totalQuantity, totalAmount, clearCart } = useCart();

  const handleCheckout = () => {
    if (
      confirm('Checkout is not implemented yet. Do you want to clear the Cart?')
    ) {
      clearCart();
    }
  };

  if (cart.length === 0) {
    return <p className={style.cart__title}>Your cart is empty</p>;
  }

  return (
    <>
      <ButtonBack />
      <h1 className={style.cart__title}>Cart</h1>
      <div className={style.cart__page}>
        <div className={style.cart__items}>
          {cart.map(item => (
            <CartItem
              key={item.id}
              product={item.product}
              quantity={item.quantity}
            />
          ))}
        </div>

        <div className={style.cart__checkout}>
          <div className={style['cart__price-description']}>
            <p className={style['cart__checkout--price']}>${totalAmount}</p>
            <p className={style['cart__checkout--total']}>
              Total for {totalQuantity} items
            </p>
          </div>
          <button
            className={style['cart__checkout--button']}
            onClick={handleCheckout}
          >
            Checkout
          </button>
        </div>
      </div>
    </>
  );
};
