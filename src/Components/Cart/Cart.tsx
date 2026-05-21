/* eslint-disable max-len */
import React, { useState } from 'react';
import { Header } from '../Header/header';
import { useCart } from '../../Context/Context';
import { useFav } from '../../Context/FavouritesContext';
import { Footer } from '../Footer/Footer';
import ArrowGray from '../../images/icons/ChevronGray.svg';
import Home from '../../images/icons/Home.svg';
import { Link } from 'react-router-dom';
import './Cart.scss';
import Delete from '../../images/icons/Close.svg';
import Minus from '../../images/icons/Minus.svg';
import Plus from '../../images/icons/Plus.svg';
import { Aside } from '../Aside/Aside';

export const Cart = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [checkOut, setCheckOut] = useState(false);
  const { totalQuantity, items, removeFromCart, changeQuantity, clearCart } =
    useCart();
  const { totalFavourites } = useFav();
  const totalPrice = items.reduce(
    (total, item) => total + item.product.fullPrice * item.quantity,
    0,
  );

  return (
    <div className="cart">
      <div className="cart__header">
        <Header
          cartItemsCount={totalQuantity}
          favouritesCount={totalFavourites}
          setMenuOpen={setMenuOpen}
        />
        {menuOpen && <Aside setMenuOpen={setMenuOpen} />}
      </div>
      <div className="cart__content">
        <div className="cart__path">
          <Link to="/">
            <img src={Home} alt="" />
          </Link>
          <img src={ArrowGray} alt="" />
          <span className="cart__path-name">Cart</span>
        </div>
        <h1 className="cart__title">Cart</h1>
        <div className="cart__sub">{totalQuantity} items</div>
        <div className="cart__container">
          <div className="cart__items">
            {totalQuantity === 0 && !checkOut && (
              <span className="cart__items-empty">Your cart is empty</span>
            )}
            <div className="cart__grid">
              {items.map(item => (
                <Link
                  to={`/${item.product.category}/${item.product.id}`}
                  key={item.product.id}
                  className="cart__item"
                >
                  <div className="cart__left">
                    <button
                      type="button"
                      className="cart__delete"
                      onClick={e => {
                        e.preventDefault();
                        removeFromCart(item.id);
                      }}
                    >
                      <img className="cart__delete-icon" src={Delete} alt="" />
                    </button>
                    <div className="cart__img">
                      <img
                        className="cart__image"
                        src={item.product.image}
                        alt=""
                      />
                    </div>
                    <p className="cart__title">{item.product.name}</p>
                  </div>
                  <div className="cart__right">
                    <div className="cart__quantity">
                      <button
                        onClick={e => {
                          e.preventDefault();
                          if (item.quantity > 1) {
                            changeQuantity(item.id, item.quantity - 1);
                          }
                        }}
                        disabled={item.quantity < 2}
                        // eslint-disable-next-line max-len
                        className={`icon cart__quantity-minus cart__quantity-button ${item.quantity < 2 ? 'cart__quantity-button--disabled' : ''}`}
                      >
                        <img src={Minus} alt="" />
                      </button>
                      <span className="cart__items-quantity">
                        {item.quantity}
                      </span>
                      <button
                        onClick={e => {
                          e.preventDefault();
                          changeQuantity(item.id, item.quantity + 1);
                        }}
                        className="icon cart__quantity-plus cart__quantity-button"
                      >
                        <img src={Plus} alt="" />
                      </button>
                    </div>
                    <span className="cart__price">
                      ${item.product.fullPrice * item.quantity}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
          <div
            className={`cart__total ${totalQuantity < 1 ? 'cart__total-none' : ''}`}
          >
            <span className="cart__total-price">${totalPrice}</span>
            <span className="cart__total-subtotal">
              Total for {totalQuantity} items
            </span>
            <div className="cart__line"></div>
            <button
              onClick={() => {
                setCheckOut(true);
                clearCart();
              }}
              className="cart__checkout"
              disabled={totalQuantity === 0}
            >
              Checkout
            </button>
          </div>
          {checkOut && (
            <div className="cart__check">
              <div className="cart__check-container">
                <>
                  <h1 className="cart__check-title section-title">
                    Thank you for your purchase!
                  </h1>
                  <div className="cart__line"></div>
                  <button
                    onClick={() => setCheckOut(false)}
                    className="cart__check-close"
                  >
                    Close
                  </button>
                </>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="cart__footer">
        <Footer />
      </div>
    </div>
  );
};
