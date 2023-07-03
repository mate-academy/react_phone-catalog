import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import classNames from 'classnames';

import './Cart.scss';

import { useCartContext } from '../../context/cartContext/CartContext';
import { removeFromCart, updateLocalStorage } from '../../helpers/Cart';
import { CartItem } from '../../types/Cart';
import Modal from '../../components/modal/Modal';

import { ReactComponent as ArrowLeft }
  from '../../icons/Chevron (Arrow Left).svg';

import { ReactComponent as Cross }
  from '../../icons/icons-close.svg';

const Cart: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [checkoutIsclicked, setCheckoutIsClicked] = useState(false);

  const { setAddedToCart } = useCartContext();
  const navigate = useNavigate();

  const totalItemsCount = cartItems.reduce((accum, item) => (
    item.quantity + accum
  ), 0);

  useEffect(() => {
    const cart: CartItem[] = JSON.parse(localStorage.getItem('cart') || '[]');

    setCartItems(cart);
  }, []);

  const handleRemoveItem = (item: CartItem) => {
    removeFromCart(item);
    setCartItems(currentItems => (
      currentItems.filter(({ product }) => product.id !== item.product.id)
    ));
    setAddedToCart(prev => prev - 1);
  };

  const increaseQuantity = (item: CartItem) => {
    setCartItems(prevCartItems => {
      const updatedItems = prevCartItems.map(cartItem => (
        cartItem.product.id === item.product.id
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      ));

      updateLocalStorage(updatedItems);

      return updatedItems;
    });
  };

  const decreaseQuantity = (item: CartItem) => {
    setCartItems(prevCartItems => {
      const updatedItems = prevCartItems.map(cartItem => (
        cartItem.product.id === item.product.id && cartItem.quantity > 1
          ? { ...cartItem, quantity: cartItem.quantity - 1 }
          : cartItem
      ));

      updateLocalStorage(updatedItems);

      return updatedItems;
    });

    updateLocalStorage(cartItems);
  };

  const totalPrice = cartItems.reduce((accum, current) => (
    (current.product.price * current.quantity) + accum
  ), 0);

  return (
    <section
      className="cart"
    >
      {checkoutIsclicked && <Modal onClose={setCheckoutIsClicked} />}

      <button
        className="breadcrumps"
        type="button"
        onClick={() => navigate(-1)}
      >
        <ArrowLeft className="icon" />
        <span className="navlink">Back</span>
      </button>

      <h2 className="title">
        {cartItems.length ? 'Cart' : 'Your cart is empty'}
      </h2>

      {cartItems.length > 0 && (
        <div className="cart-container">
          <div className="products">
            {cartItems.map(item => (
              <div
                key={item.product.id}
                className="product"
              >
                <button
                  type="button"
                  data-cy="cartDeleteButton"
                  onClick={() => handleRemoveItem(item)}
                >
                  <Cross className="cross" />
                </button>

                <Link to={`/phones/${item.product.phoneId}`}>
                  <div className="product-container">
                    <img
                      className="product-image"
                      src={`./_new/${item.product.image}`}
                      alt="product"
                    />
                    <span className="product-name">
                      {item.product.name}
                    </span>
                  </div>
                </Link>

                <div className="product-controls">
                  <button
                    type="button"
                    className={classNames('product-button', {
                      'is-disabled': item.quantity === 1,
                    })}
                    onClick={() => decreaseQuantity(item)}
                  >
                    -
                  </button>

                  <span className="product-count">
                    {item.quantity}
                  </span>

                  <button
                    type="button"
                    className="product-button"
                    onClick={() => increaseQuantity(item)}
                  >
                    +
                  </button>
                </div>

                <span className="product-price">
                  {`$${item.product.price}`}
                </span>
              </div>
            ))}
          </div>

          <div
            className="sum"
            data-cy="productQauntity"
          >
            <div className="sum-total">
              {`$${totalPrice}`}
            </div>

            <div className="sum-subtitle">
              {`Total for ${totalItemsCount} items`}
            </div>

            <div className="sum-devider" />

            <button
              type="button"
              className="sum-button"
              onClick={() => setCheckoutIsClicked(prev => !prev)}
            >
              Checkout
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default Cart;
