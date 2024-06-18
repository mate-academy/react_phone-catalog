import { Link } from 'react-router-dom';
import { Back } from '../../components/Back';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { Message } from '../../components/Message';
import { Product } from '../../types/Product';
import './CartPage.scss';

import {
  clearCartWithLocal,
  decreaseInCartWithLocal,
  deleteFromCartWithLocal,
  increaseInCartWithLocal,
} from '../../features/cartSlice';
import classNames from 'classnames';
import { Modal } from '../../components/Modal';
import { useState } from 'react';

export const CartPage = () => {
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector(state => state.cart);
  const [modalShown, setModalShown] = useState(false);
  const totalPrice = cartItems.reduce(
    (acc, cartItem) => acc + cartItem.quantity * cartItem.product.price,
    0,
  );
  const itemsInCart = cartItems.reduce(
    (acc, cartItem) => acc + cartItem.quantity,
    0,
  );

  const handleItemIncrease = (product: Product) => {
    dispatch(increaseInCartWithLocal(product));
  };

  const handleItemDecrease = (id: number) => {
    dispatch(decreaseInCartWithLocal(id));
  };

  const handleItemDelete = (id: number) => {
    dispatch(deleteFromCartWithLocal(id));
  };

  const handleSubmit = () => {
    dispatch(clearCartWithLocal());
  };

  const closeModal = () => {
    setModalShown(false);
  };

  return (
    <main className="container cart-page">
      <div className="cart-page__back">
        <Back />
      </div>

      <h1 className="cart-page__title">Cart</h1>

      {modalShown && <Modal closeModal={closeModal} action={handleSubmit} />}

      {cartItems.length > 0 ? (
        <div className="cart-page__content">
          <ul className="cart-page__list">
            {cartItems.map(cartItem => (
              <li className="cart-page__list-item" key={cartItem.id}>
                <div className="cart-page__product">
                  <button
                    className="cart-page__delete-button"
                    onClick={() => {
                      handleItemDelete(cartItem.id);
                    }}
                  ></button>
                  <Link
                    className="cart-page__product-link"
                    to={`/${cartItem.product.category}/${cartItem.product.itemId}`}
                  >
                    <img
                      className="cart-page__product-image"
                      src={cartItem.product.image}
                      alt="Product image"
                    ></img>
                    <div className="cart-page__product-name">
                      {cartItem.product.name}
                    </div>
                  </Link>
                </div>
                <div className="cart-page__numbers">
                  <div className="cart-page__counter">
                    <button
                      className={classNames(
                        'cart-page__counter-button',
                        'cart-page__counter-button--type--minus',
                        { disabled: cartItem.quantity <= 1 },
                      )}
                      onClick={() => {
                        handleItemDecrease(cartItem.id);
                      }}
                    ></button>
                    {cartItem.quantity}
                    <button
                      className="
                  cart-page__counter-button
                  cart-page__counter-button--type--plus
                  "
                      onClick={() => {
                        handleItemIncrease(cartItem.product);
                      }}
                    ></button>
                  </div>
                  <div className="cart-page__item-price">
                    ${cartItem.product.price}
                  </div>
                </div>
              </li>
            ))}
          </ul>

          <div className="cart-page__checkout">
            <div className="cart-page__total">
              <p className="cart-page__total-price">${totalPrice}</p>
              <p className="cart-page__total-amount">
                Total for {itemsInCart} items
              </p>
            </div>

            <div className="cart-page__divider"></div>

            <button
              className="cart-page__checkout-button"
              onClick={() => {
                setModalShown(true);
              }}
            >
              Checkout
            </button>
          </div>
        </div>
      ) : (
        <Message text="Your cart is empty." />
      )}
    </main>
  );
};
