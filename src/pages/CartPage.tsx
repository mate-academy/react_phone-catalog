import React, { useEffect, useState } from 'react';

import { BackBtn } from '../components/BackBtn';
import { CartItem, Cart } from '../utils/Cart';
import { CartInfo } from '../components/CartInfo';

export const CartPage: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  useEffect(() => {
    Cart.load();
    const updateCartItems = () => {
      setCartItems([...Cart.items]);
    };

    updateCartItems();

    Cart.subscribe(updateCartItems);

    return () => {
      Cart.unsubscribe(updateCartItems);
    };
  }, []);

  // prettier-ignore
  return (
    <section className="Main__cartPage CartPage">
      <div className="Main__backBtn">
        <BackBtn />
      </div>
      <h1>Cart</h1>

      {!cartItems.length && (
        <div className="Main__noItemsBlock">
          <h1>Your cart is empty</h1>
          <p className="Main__text">
            You can put product to your cart by clicking{' '}
            <span className="Main__text--bold">
              &ldquo;Add to cart&rdquo;
            </span>
            {' '}
            button
          </p>
        </div>
      )}

      {!!cartItems.length && <CartInfo cartItems={cartItems} />}
    </section>
  );
};
