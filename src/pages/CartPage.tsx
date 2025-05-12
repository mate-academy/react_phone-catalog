import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../app/store';
import {
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  getTotals,
} from '../features/cart';
import './CartPage.scss';

export const CartPage: React.FC = () => {
  const dispatch = useDispatch();

  // Destructure values from the cart slice
  const { cartItems, cartTotalAmount, cartTotalQuantity } = useSelector(
    (state: RootState) => state.cart,
  );

  // Recalculate totals whenever cartItems change
  useEffect(() => {
    dispatch(getTotals());
  }, [cartItems, dispatch]);

  const handleRemoveFromCart = (cartItem: any) => {
    dispatch(removeFromCart(cartItem));
  };

  const handleIncrease = (product: any) => {
    dispatch(increaseQuantity(product));
  };

  const handleDecrease = (product: any) => {
    dispatch(decreaseQuantity(product));
  };

  return (
    <div className="section" id="cart">
      <div className="cart__page">
        <h1 id="heading1">Cart</h1>

        {cartItems.length === 0 ? (
          <p>Your list is currently empty.</p>
        ) : (
          <div className="shopping__list">
            <div className="cart__items">
              {cartItems.map(product => (
                <div className="cart__item" key={product.name}>
                  <div className="cart__item__data">
                    <button
                      className="remove"
                      onClick={() => handleRemoveFromCart(product)}
                    >
                      X
                    </button>
                    <img
                      src={product.image}
                      alt={product.name}
                      className="cart__img"
                    />
                    <p className="cart__item__name">{product.name}</p>
                  </div>
                  <div className="cart__count__wrap">
                    <div className="cart__count">
                      <button
                        className="minus"
                        onClick={() => handleDecrease(product)}
                      >
                        -
                      </button>
                      <div className="cart__quantity">
                        {product.cartQuantity}
                      </div>
                      <button
                        className="plus"
                        onClick={() => handleIncrease(product)}
                      >
                        +
                      </button>
                    </div>
                    <p className="cart__item__price">
                      ${product.price * product.cartQuantity}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="checkout">
              <div className="checkout__info">
                <p className="checkout__price">${cartTotalAmount}</p>
                <p className="checkout__amount">
                  Total for {cartTotalQuantity} items
                </p>
                <hr />
              </div>

              <button className="checkout__button">Checkout</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;
