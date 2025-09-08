import React from 'react';
import { useCartValues } from '../../store/CartStore';
import { GoBackBttn } from '../../components/GoBackBttn';
import { CartPageItem } from '../../components/CartPageItem';
import { Product } from '../../types/Product';
import { Phone } from '../../types/Phone';
import { Tablet } from '../../types/Tablet';
import { Accessory } from '../../types/Accessory';

type DetailedProduct = Phone | Tablet | Accessory;
type AnyProduct = Product | DetailedProduct;

export const CartPage: React.FC = () => {
  const { cart, clearCart } = useCartValues();

  const uniqueCartItems = cart.filter(
    (item, index, self) =>
      item &&
      item.product &&
      item.product.id &&
      self.findIndex(
        i => i && i.product && i.product.id === item.product.id,
      ) === index,
  );

  const getProductPrice = (product: AnyProduct): number => {
    const detailedProduct = product as DetailedProduct;

    return Number(
      detailedProduct.priceDiscount ??
        product.price ??
        detailedProduct.priceRegular ??
        0,
    );
  };

  const totalPrice = uniqueCartItems.reduce((acc, num) => {
    const price = getProductPrice(num.product);

    return acc + price * num.quantity;
  }, 0);

  const totalItems = uniqueCartItems.reduce(
    (acc, num) => acc + num.quantity,
    0,
  );

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
              {cart.map(item =>
                item && item.product ? (
                  <CartPageItem item={item} key={item.product.itemId} />
                ) : null,
              )}
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
            src="/img/cart-is-empty.png"
            alt="cart is empty"
            className="cartPage__empty__img"
          />
        </div>
      )}
    </div>
  );
};
