import './Gadgets.scss';
import './UnderNav.scss';
import './CartPage.scss';
import EmptyCart from '../img/EmptyCart.png';
import xIcon from '../img/xIcon.svg';
import '../App.scss';
import { CartContext } from './AppProvaider';
import { useContext } from 'react';
import { CartContextType } from './types';

export const CartPage = () => {
  const cartContext = useContext<CartContextType>(CartContext);
  const { cart, addToCart, removeFromCart, deleteFromCart } = cartContext;
  const getCartPrice = () => {
    let sum = 0;

    for (const item of cart) {
      sum = sum + item.product.priceDiscount * item.quantity;
    }

    return sum;
  };

  const getCartItemsQuantity = () => {
    let sum = 0;

    for (const item of cart) {
      sum = sum + item.quantity;
    }

    return sum;
  };

  return (
    <>
      <div className="under-nav">
        <a href="/phones" className="greyText">{`< Back`}</a>
        <h1 className="under-nav__h1">Cart</h1>
      </div>
      {cart.length === 0 ? (
        <img src={EmptyCart} alt="EmptyCart" />
      ) : (
        <div className="cart-list">
          {cart.map(item => (
            <div key={item.product.id} className="cart-item">
              <img
                src={xIcon}
                alt="xIcon"
                className="cart-item__xIcon"
                onClick={() => deleteFromCart(item.product)}
              />
              <img
                src={item.product.images[0]}
                alt={item.product.name}
                className="cart-item__img"
              />
              <div className="cart-item__name">{item.product.name}</div>
              <div className="cart-item__count-selector">
                <button
                  className="cart-item__count-selector__button"
                  onClick={() => removeFromCart(item.product)}
                  disabled={item.quantity === 1}
                >
                  -
                </button>
                <div className="cart-item__count-selector__count">
                  {item.quantity}
                </div>
                <button
                  onClick={() => addToCart(item.product)}
                  className="cart-item__count-selector__button"
                >
                  +
                </button>
              </div>
              <div className="cart-item__price h3">
                {`$${item.product.priceDiscount * item.quantity}`}
              </div>
            </div>
          ))}
        </div>
      )}
      {cart.length !== 0 && (
        <div className="checkout-box">
          <div className="checkout-box__price checkout-box__text h2">
            {`$` + getCartPrice()}
          </div>
          <div className="checkout-box__total greyText">{`Total for ${getCartItemsQuantity()} items`}</div>
          <div className="grey-line no-margin"></div>
          <button className="button__add checkout-box__button">Checkout</button>
        </div>
      )}
    </>
  );
};
