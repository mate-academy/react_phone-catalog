import React, { useState, useEffect } from 'react';
import { CartCard } from './CartCard/CartCard';
import './CartPage.scss';
import { useHistory } from 'react-router-dom';
import { GoBack } from '../../components/GoBack/GoBack';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';
import { clearCart } from '../../store/cart';

export const CartPage = () => {
  const cart = useSelector(((state: RootState) => state.cart))
  const dispatch = useDispatch();
  const stringedCart = cart.map(item => JSON.stringify(item));
  const setFromCart = new Set(stringedCart);
  const cards = [...setFromCart]
    .map(item => JSON.parse(item))
    .sort((a, b) => a.name.localeCompare(b.name));
  const [total, setTotal] = useState(0);
  const [itemsCount, setItemsCount] = useState(cart.length);
  const history = useHistory();

  useEffect(() => {
    let temp = 0;
    for (let i = 0; i < cart.length; i++) {
      temp += cart[i].price - cart[i].price * cart[i].discount / 100;
    };
    setTotal(temp);
    setItemsCount(cart.length);
  }, [cart])

  const handleCheckout = () => {
    dispatch(clearCart());
    history.push('/thanks')
  }

  return (
    <div className="CartPage">
      <GoBack />
      <h1 className="CartPage__title">Cart</h1>
      <div className="CartPage__main">
        <div
          className="CartPage__wrapper"
          style={{ minHeight: `${cards.length * 144}px` }}
        >
          {cards.length === 0
            ? <p className="CartPage__empty">Cart is empty.</p>
            : (cards.map((product, index) => {
              const count = cart.filter(item => product.id === item.id).length;
              return (
                <CartCard
                  key={product.id}
                  index={index}
                  product={product}
                  count={count}
                />
              )
            }))
          }
        </div>
        <div className="CartPage__summary">
          <div className="CartPage__container">
            <span
              className="CartPage__total"
            >
              {`$${total}`}
            </span>
            <span
              className="CartPage__legend"
            >
              {`Total for ${itemsCount} items`}
            </span>
            <span
              className="CartPage__horis-line"
            >
            </span>
          </div>
          <button
            type="button"
            className="CartPage__checkout"
            onClick={handleCheckout}
          >
            Checkout
        </button>
        </div>
      </div>
    </div>
  )
}


