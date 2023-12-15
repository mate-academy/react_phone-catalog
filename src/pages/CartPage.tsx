/* eslint-disable operator-linebreak */
import { useContext, useEffect, useMemo } from 'react';
import { MainContext } from '../context/MainContext';
import { BackButton } from '../components/BackButton';
import { CartItems } from '../components/CartItems';
import { CartInfo } from '../components/CartInfo';

export const CartPage = () => {
  const {
    setIsMenuOpen,
    setIsHeaderSearchVisible,
    setDocumentTitle,
    cartItems,
  } = useContext(MainContext);

  useEffect(() => {
    setDocumentTitle('Cart Page');
    setIsHeaderSearchVisible(false);
    setIsMenuOpen(false);
  }, []);

  const totalPrice = useMemo(() => {
    return cartItems.reduce((a, b) => a + b.quantity * b.product.price, 0);
  }, [cartItems]);

  return (
    <section className="section cart">
      <div className="section__container">
        <div className="cart__block">
          <BackButton />
          <h1 className="h1 cart__title">Cart</h1>

          {cartItems.length > 0 ? (
            <div className="cart__wrapper">
              <CartItems items={cartItems} />
              <CartInfo
                totalPrice={totalPrice}
                totalNumber={cartItems.length}
              />
            </div>
          ) : (
            <h3 className="h3">Your cart is empty</h3>
          )}
        </div>
      </div>
    </section>
  );
};
