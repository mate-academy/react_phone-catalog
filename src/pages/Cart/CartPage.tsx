import React, { useState, useEffect, useContext } from 'react';
import { CartCard } from '../../components/CartCard/CartCard';
import './CartPage.scss';
import { useHistory } from 'react-router-dom';
import {MyContext} from '../../App';

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
      <div>
        {cards.map(product => {
          const count = cart.filter(item => product.id === item.id).length;
          return (
            <CartCard
            key={product}
            cart={cart}
            product={product}
            count={count}
            setCart={setCart} />
          )
        })
        }
      </div>
      <div className="CartPage__summary">
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
        <button
          type="button"
          className="CartPage__checkout"
          onClick={handleCheckout}
        >
          Checkout
        </button>
      </div>


    </div>
  )

}


