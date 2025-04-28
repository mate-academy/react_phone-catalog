import React from 'react';
import { useCartValues } from '../../store/CartContext';
import { GoBackButton } from '../../components/GoBackButton';
import { CartPageItem } from '../../components/CartPageItem';

export const CartPage: React.FC = () => {
  const { cart, clearCart } = useCartValues();

  const totalPrice = cart.reduce(
    (acc, num) => acc + num.product.price * num.quantity,
    0,
  );

  const totalItems = cart.reduce((acc, num) => acc + num.quantity, 0);

  return (
    <>
      <div className="goBackButton__cartPage">
        <GoBackButton />
      </div>

      <h1 className="cartPage__title">Cart</h1>

      {cart.length > 0 ? (
        <div className="cartPage">
          <div className="cartPage__first-container">
            <div className="cartPage__list">
              {cart.map(item => (
                <CartPageItem item={item} key={item.product.id} />
              ))}
            </div>
          </div>

          <div className="cartPage__second-container">
            <div className="cartPage__priceBlock">
              <h2 className="cartPage__total-price">
                ${cart.length === 0 ? 0 : totalPrice}
              </h2>
              <p className="cartPage__items-count">
                Total for {totalItems} items
              </p>
            </div>

            <hr className="cartPage__divider"></hr>

            <button className="cartPage__checkout" onClick={clearCart}>
              Checkout
            </button>
          </div>
        </div>
      ) : (
        <h3 className="cartPage__empty">Your cart is empty</h3>
      )}
    </>
  );
};
