import React from 'react';
import { useCartValues } from '../../store/CartStore';
import { GoBackBttn } from '../../components/GoBackBttn';
import { CartPageItem } from '../../components/CartPageItem';

export const CartPage: React.FC = () => {
  const { cart, clearCart } = useCartValues();

  const uniqueCartItems = cart.filter(
    (item, index, self) =>
      item && item.product && item.product.id &&
      self.findIndex(i => i.product.id === item.product.id) === index
  );

  const totalPrice = uniqueCartItems.reduce(
    (acc, num) => {
      const price = Number((num.product as any).priceDiscount ?? num.product.price ?? (num.product as any).priceRegular ?? 0);
      return acc + price * num.quantity;
    },
    0,
  );

  const totalItems = uniqueCartItems.reduce((acc, num) => acc + num.quantity, 0);

  return (
    <div className="page-container">
      <div className="goBackButton__cartPage">
        <GoBackBttn />
      </div>

      <h1 className="cartPage__title">Cart</h1>

      {uniqueCartItems.length > 0 ? (
        <div className="cartPage">
          <div className="cartPage__first-container">
            <div className="cartPage__list">
              {cart.map(item => (
                <CartPageItem item={item} key={item.product.itemId} />
              ))}
            </div>
          </div>

          <div className="cartPage__second--container">
            <div className="cartPage__priceBlock">
              <h2 className="cartPage__total-price">
                ${uniqueCartItems.length === 0 ? 0 : totalPrice}
              </h2>
              <p className="cartPage__items-count">
                Total for {totalItems} items
              </p>
            </div>

            <hr className="cartPage__divider" />

            <button className="cartPage__checkout" onClick={clearCart}>
              Checkout
            </button>
          </div>
        </div>
      ) : (
        <div className="cartPage__empty">
          <h3 className="cartPage__empty__title">Your cart is empty</h3>
          <img
            src="./img/cart-is-empty.png"
            alt="cart is empty"
            className="cartPage__empty__img"
          />
        </div>
      )}
    </div>
  );
};