import { useEffect, useMemo, useState } from 'react';

import { useCart } from '../../contexts/Cart';
import { useProducts } from '../../contexts/Products';

import { Product } from '../../types/Product';
import { CartItem } from '../../components/CartItem';
import { BackBtn } from '../../components/BabkBtn';

import './CartPage.scss';

export const Cart = () => {
  const { cartList, clearCartList, count } = useCart();
  const { phones, tablets, accessories } = useProducts();
  const [orderSent, setOrderSent] = useState(false);

  useEffect(() => {
    if (orderSent) {
      const timer = setTimeout(() => setOrderSent(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [orderSent]);

  const allProducts = useMemo(
    () => [...(phones.items ?? []), ...(tablets.items ?? []), ...(accessories.items ?? [])],
    [phones.items, tablets.items, accessories.items],
  );

  const cartProducts: Product[] = useMemo(
    () =>
      cartList
        .map(cartPr => allProducts.find(p => p.id === cartPr.id))
        .filter((p): p is Product => Boolean(p)),
    [cartList, allProducts],
  );

  const totalPrice = useMemo(() => {
    return cartList.reduce((acc, item) => {
      const product = allProducts.find(pr => pr.id === item.id);
      const price = product ? product.priceDiscount : 0;
      return acc + price * item.quantity;
    }, 0);
  }, [cartList, allProducts]);

  const totalItems = useMemo(() => {
    return cartList.reduce((acc, item) => acc + item.quantity, 0);
  }, [cartList]);

  return (
    <div className="cart">
      <div className="cart__padding">
        <div className="carg__back">
          <BackBtn />
        </div>

        <h1 className="cart__title">Cart</h1>

        {count === 0 && (
          <div className="cart__ampty">
            {orderSent ? (
              <div className="cart__ampty__sent">
                <p className="cart__ampty__sent__p">Your order has been successfully sent.</p>
                <div className="cart__ampty__sent__img" onClick={() => setOrderSent(false)}>
                  <img src="./img/close.svg" alt="close" className="cart__ampty__sent__img__link" />
                </div>
              </div>
            ) : (
              <p className="cart__ampty__title">Cart is ampty</p>
            )}

            <div className="cart__ampty__img">
              <img src="./img/cart-is-empty.png" alt="close" className="cart__ampty__img__link" />
            </div>
          </div>
        )}

        <div className="cart__wrapper">
          <div className="cart__content">
            {cartProducts.map(product => (
              <CartItem
                key={product.id}
                product={product}
                cartItem={cartList.find(i => i.id === product.id)}
              />
            ))}
          </div>

          {count > 0 && (
            <div className="cart__checkout">
              <div className="cart__checkout__details">
                <p className="cart__checkout__price">{`$${totalPrice}`}</p>
                <p className="cart__checkout__items">Total for {totalItems} items</p>
              </div>
              <div className="cart__checkout__br"></div>
              <div
                className="cart__checkout__btn"
                onClick={() => {
                  clearCartList();
                  setOrderSent(true);
                }}
              >
                Checkout
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
