import React, { useState, useEffect, useContext } from 'react';
import { CartCard } from './CartCard/CartCard';
import './CartPage.scss';
import { useHistory } from 'react-router-dom';
import {MyContext} from '../../App';
import { GoBack } from '../../components/GoBack/GoBack';

export const CartPage = () => {

  const {cart, setCart} = useContext(MyContext);

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
    setCart([]);
    history.push('/thanks')

  }


  return (
    <div className="CartPage">
    <GoBack />
    <h1 className="CartPage__title">Cart</h1>
    <div className="CartPage__main">
      <div
      className="CartPage__wrapper"
      style={{minHeight: `${ cards.length * 144}px`}}
      >

        {cards.length === 0
        ? <p className="CartPage__empty">Cart is empty.</p>
        : (cards.map((product, index) => {
          const count = cart.filter(item => product.id === item.id).length;
          return (
            <CartCard
            key={product.id}
            index={index}
            cart={cart}
            product={product}
            count={count}
            setCart={setCart} />
          )
        }))
        }
      </div>

      <div className="CartPage__summary">
        <div>
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


