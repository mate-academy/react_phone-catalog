import { useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import cn from 'classnames';
import './Cart.scss';
import '../../App.scss';

import { CatalogContext } from '../CatalogContext';

export const Cart: React.FC = () => {
  const { cartItems, setCartItems } = useContext(CatalogContext);
  const [checkoutClicked, setCheckoutClicked] = useState(false);

  const itemIsOne = (itemId: number) => {
    const currentItem = cartItems.find(cartItem => cartItem.id === itemId);

    return currentItem ? currentItem.quantity === 1 : false;
  };

  const totalPriceForItem = (itemId: number) => {
    const currentItem = cartItems.find(cartItem => cartItem.id === itemId);

    return currentItem!.quantity * currentItem!.item.price;
  };

  const totalPrice = cartItems.reduce((accumulator, cartItem) => {
    return accumulator + cartItem.item.price * cartItem.quantity;
  }, 0);

  const handleDeleteFromCartClick = (itemId: number) => {
    const updatedCartItems = cartItems.filter(
      cartItem => cartItem.id !== itemId,
    );

    setCartItems(updatedCartItems);
  };

  const handleMinus = (itemId: number) => {
    const updatedCartItems = cartItems.map(cartItem => {
      if (cartItem.quantity > 1 && cartItem.id === itemId) {
        return { ...cartItem, quantity: cartItem.quantity - 1 };
      }

      return cartItem;
    });

    setCartItems(updatedCartItems);
  };

  const handlePlus = (itemId: number) => {
    const updatedCartItems = cartItems.map(cartItem => {
      if (cartItem.id === itemId) {
        return { ...cartItem, quantity: cartItem.quantity + 1 };
      }

      return cartItem;
    });

    setCartItems(updatedCartItems);
  };

  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  return (
    <div className="cart">
      <div className="back cart__back">
        <img
          src="./icons/Chevron-Arrow-Right.svg"
          alt="arrow"
          className="back__arrow"
        />
        <button
          type="button"
          className="back__button"
          onClick={goBack}
          data-cy="backButton"
        >
          Back
        </button>
      </div>

      <h1 className="title">Cart</h1>

      {cartItems.length === 0 ? (
        <h2 className="cart__empty">Your cart is empty</h2>
      ) : (
        <div className="cart__container">
          <div className="cart__items">
            {cartItems.map(cartItem => (
              <div className="cart__item" key={cartItem.id}>
                <button
                  type="button"
                  onClick={() => handleDeleteFromCartClick(cartItem.id)}
                  className="cart__item-delete"
                  data-cy="cartDeleteButton"
                >
                  <img src="./icons/Delete.svg" alt="delete" />
                </button>

                <div className="cart__item-image">
                  <img
                    src={`${cartItem.item.image}`}
                    alt={`product-${cartItem.id}`}
                  />
                </div>

                <div className="cart__item-name-wrapper">
                  <p className="cart__item-name">{cartItem.item.name}</p>
                </div>

                <div className="cart__item-panel">
                  <button
                    type="button"
                    onClick={() => handleMinus(cartItem.id)}
                    className={cn('cart__item-operator', {
                      'cart__item-operator--disabled': itemIsOne(cartItem.id),
                    })}
                    aria-label="Decrease quantity"
                  >
                    <div
                      className={cn('cart__item-sign cart__item-sign--minus', {
                        'cart__item-sign--disabled': itemIsOne(cartItem.id),
                      })}
                    />
                  </button>

                  <div
                    className="cart__item-quantity"
                    data-cy="productQauntity"
                  >
                    {cartItem.quantity}
                  </div>

                  <button
                    type="button"
                    onClick={() => handlePlus(cartItem.id)}
                    className="cart__item-operator"
                    aria-label="Increase quantity"
                  >
                    <div className="cart__item-sign cart__item-sign--plus" />
                  </button>
                </div>

                <h2 className="cart__item-price">
                  {`$${totalPriceForItem(cartItem.id)}`}
                </h2>
              </div>
            ))}
          </div>

          <div className="cart__right">
            <div className="cart__summary">
              <div className="cart__price">
                <h1 className="cart__total">{`$${totalPrice}`}</h1>
                <p className="cart__total-text">{`Total for ${cartItems.length} items`}</p>
              </div>
              <button
                onClick={() => setCheckoutClicked(true)}
                type="button"
                className="cart__button"
              >
                Checkout
              </button>
            </div>
            {checkoutClicked && (
              <p className="cart__checkout-message">
                We are sorry, but this feature is not implemented yet
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
