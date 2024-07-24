import { useContext, useState } from 'react';
import { Back } from '../shared/components/Back';
import './Cart.scss';
import { DispatchContext, StateContext } from '../utils/GlobalStateProvider';
import { CartItem } from './CartItem';
import { NoProducts } from '../shared/components/NoProducts';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames';

export const Cart = () => {
  const navigate = useNavigate();
  const { cartItems, isDarkThemeOn } = useContext(StateContext);
  const dispatch = useContext(DispatchContext);
  const defaultItems = cartItems.map(el => el.id).map(id => ({ id, count: 1 }));
  const [countItems, setCountItems] =
    useState<{ id: number; count: number }[]>(defaultItems);

  const totalPrice = cartItems
    .map(el => {
      const elQuantity = countItems.find(item => item.id === el.id)?.count || 1;

      return el.price * elQuantity;
    })
    .reduce((prev, current) => prev + current, 0);

  const totalAmmount = cartItems
    .map(el => {
      const elQuantity = countItems.find(item => item.id === el.id)?.count || 1;

      return elQuantity;
    })
    .reduce((prev, current) => prev + current, 0);

  const handleCheckout = () => {
    const isUserWannaReturn = confirm(
      'Checkout is not implemented yet. Do you want to clear the Cart?',
    );

    if (isUserWannaReturn) {
      dispatch({ type: 'setCartItems', payload: [] });

      navigate('/');
    }
  };

  return (
    <main className="cart">
      <div className="cart__back">
        <Back />
      </div>
      {cartItems.length > 0 ? (
        <div className="cart__wrapper">
          <h1 className="cart__title">Cart</h1>
          <div className="cart__head">
            <section className="cart__content">
              <div className="cart__products">
                {cartItems.map(item => (
                  <CartItem
                    item={item}
                    key={item.id}
                    countItems={countItems}
                    setCountItems={setCountItems}
                  />
                ))}
              </div>
            </section>
            <section
              className={classNames('cart__payment', {
                'cart__payment-dark': !isDarkThemeOn,
              })}
            >
              <div className="cart__payment-info">
                <h2>${totalPrice}</h2>
                <p>Total for {totalAmmount} items</p>
              </div>

              <button onClick={handleCheckout}>Checkout</button>
            </section>
          </div>
        </div>
      ) : (
        <div className="cart__empty">
          <NoProducts title="Your cart is empty" />
        </div>
      )}
    </main>
  );
};
