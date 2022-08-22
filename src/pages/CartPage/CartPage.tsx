/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-alert */
/* eslint-disable no-param-reassign */
import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './CartPage.scss';
import { Product } from '../../types/Product';

import { ProductsContext } from '../../helpers/ProductContext';

export const CartPage: React.FC = () => {
  const navigate = useNavigate();
  const {
    cart,
    setCart,
    addToLocalStorage,
    removeFromLocalStorage,
  } = useContext(ProductsContext);
  const [checkout, setCheckout] = useState(false);

  const getLocalStorageArray = () => {
    const jsonObj = window.localStorage.getItem('cart');

    return !jsonObj ? [] : JSON.parse(jsonObj);
  };

  const minusItem = (itemToMinus: Product) => {
    const array = getLocalStorageArray();

    const selectedItemIndex = array
      .findIndex((item: Product) => item.id === itemToMinus.id);

    array.splice(selectedItemIndex, 1);

    setCart(array);
    window.localStorage.setItem('cart', JSON.stringify(array));
  };

  const totalPrice = cart
    .map(item => (item.discount
      ? Math.round(item.price - (item.price / item.discount))
      : item.price))
    .reduce((prevPrice, currentPrice) => prevPrice + currentPrice, 0);

  const quantityOfItems = (currentItem: Product): number => {
    return cart.filter(item => item.id === currentItem.id).length;
  };

  const uniqueItems = cart
    .filter((a, i) => cart
      .findIndex((s) => a.id === s.id) === i)
    .sort((value1, value2) => value1.price - value2.price);

  const goBackPage = () => {
    navigate(-1);
  };

  if (checkout) {
    alert('We are sorry, but this feature is not implemented yet');
  }

  return (
    <>
      <div className="cart-page">
        {cart.length === 0
          ? (
            <div className="cart-page">
              <div className="title-container">
                <h1 className="title-not-found">Your cart is empty</h1>
              </div>
            </div>
          )
          : (
            <div className="cart-page-wrapper">
              <div className="icons-container" onClick={() => goBackPage()}>
                <i className="fa-solid fa-angle-left icon" />
                <span className="icon-title">Back</span>
              </div>
              <div className="header-container">
                <h1 className="mobile-title">Cart</h1>
              </div>
              <div className="cart-sections-container">
                <div className="cart-list-container">
                  <div className="cart-list">
                    {uniqueItems.map(item => (
                      <div className="item-wrapper" key={item.id}>
                        <div className="item-container">
                          <div className="delete-item">
                            <button
                              type="button"
                              className="delete-item-button"
                              data-cy="cartDeleteButton"
                              onClick={
                                () => removeFromLocalStorage('cart', item)
                              }
                            >
                              <i className="fa-solid fa-xmark" />
                            </button>
                          </div>
                          <Link to={`/product/${item.id}`}>
                            <div className="item-image">
                              <img
                                className="cart-image"
                                src={item.imageUrl}
                                alt={item.name}
                              />
                            </div>
                          </Link>
                          <div className="item-name">
                            <p className="name">
                              {`${item.name.replace('™', '')} ${item.ram || ''}`}
                            </p>
                          </div>
                          <div className="change-quantity-buttons-container">
                            <div className="remove-item-button">
                              <button
                                type="button"
                                className="minus"
                                onClick={() => minusItem(item)}
                              >
                                <i className="fa-solid fa-minus grey-color" />
                              </button>
                            </div>
                            <div
                              className="product-quantity-container"
                              data-cy="productQauntity"
                            >
                              <p className="product-quantity">
                                {quantityOfItems(item)}
                              </p>
                            </div>
                            <div className="add-item-button">
                              <button
                                type="button"
                                className="plus"
                                onClick={() => addToLocalStorage('cart', item)}
                              >
                                <i className="fa-solid fa-plus grey-color" />
                              </button>
                            </div>
                          </div>
                          <div className="item-price">
                            <p className="price">
                              {
                                `$${item.discount
                                  ? (
                                    Math.round(item.price
                                      - (item.price / item.discount)))
                                  : item.price}`
                              }
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="cart-checkout-container">
                  <div className="header-price-container">
                    <h1 className="total-price-title">{`$${totalPrice}`}</h1>
                    <p className="quantity-title">{`Total for ${cart.length} items`}</p>
                  </div>
                  <div className="checkout">
                    <button
                      type="button"
                      className="checkout-button"
                      onClick={() => setCheckout(true)}
                    >
                      Checkout
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
      </div>
    </>
  );
};
