import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './Cart.scss';
import { actionCreators } from '../../redux/cart';

export const Cart = ({ products }) => {
  const [cart, setCart] = useState(products);
  const cartItems = useSelector(state => state.cart.items);
  const dispatch = useDispatch();
  useEffect(() => console.log(cartItems))
  useEffect(() => {
    setCart(products.filter(product => cartItems.includes(product.id)));
  }, [cartItems]);

  const removeFromCart = (item) => {
    const action = actionCreators.removeFromCart(item);
    dispatch(action);
  }
  return (
    <>
      <section className="cart">

        <h1 className="cart__title">Cart</h1>
        <div className="cart__inner">
          <div>
            {cart.map(item => (
              <div key={item.id} className="cart__item item">
                <div>
                  <button
                    className="item__button item__button_delete"
                    onClick={() => removeFromCart(item.id)}>
                    <span></span>
                  </button>
                  <div className="item__main-content">
                    <img className="item__img" src={require(`../../../public/${item.imageUrl}`)}></img>
                    <p className="item__title">{item.name}</p>
                  </div>
                </div>

                <div>
                  <div className="item__buttons">
                    <button className="item__button item__button_subtract">
                      <span></span>
                    </button>
                    <p className="item__quantity">1</p>
                    <button className="item__button item__button_add">
                      <span></span>
                    </button>
                  </div>
                  <p className="item__price">${item.price}</p>
                </div>
              </div>

            ))}
          </div>

          <div className="cart__total total">
            <p className="total__price">$3297</p>
            <p className="total__title">Total for 3 items</p>
            <button className="total__button">Checkout</button>
          </div>
        </div>
      </section>

    </>
  )
}