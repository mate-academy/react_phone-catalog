import './Cart.scss';
import React, { useContext, useState } from 'react';
import { ProductContext } from '../../store/ProductContext';
import { ProductGeneral } from '../../types/ProductGeneral';
import { Back } from '../Back';
import { ModalWindow } from './ModalWindow';

export const CartPage = () => {
  const { inCart, updateProductQuantity, removeProductFromCart } =
    useContext(ProductContext);

  const [modalOpened, setModalOpened] = useState(false);

  const handleQuantityChange = (item: ProductGeneral, change: number) => {
    const newQuantity = item.quantity + change;

    if (newQuantity === 0) {
      return;
    }

    updateProductQuantity(item, newQuantity);
  };

  const handleDeleteItem = (item: ProductGeneral) => {
    removeProductFromCart(item);
  };

  const totalCheckout = (inCart as ProductGeneral[]).reduce(
    (checkout: number, item: ProductGeneral) =>
      checkout + item.quantity * item.price,
    0,
  );

  const totalItems = (inCart as ProductGeneral[]).reduce(
    (acc: number, item: ProductGeneral) => acc + item.quantity,
    0,
  );

  return (
    <>
      <div className="container">
        <Back />
        {inCart.length === 0 ? (
          <div className="cart__content">
            <p className="cart__text">Your Cart is empty...</p>
            <div className="cart__empty"></div>
          </div>
        ) : (
          <>
            <div className="cart">
              <h1 className="cart__title">Cart</h1>
              <div className="cart__wrapper">
                <div className="cart__items">
                  {inCart.map(item => (
                    <React.Fragment key={item.id}>
                      <div className="cart__item">
                        <div className="cart__item__wrapper">
                          <div
                            className="cart__item--close"
                            onClick={() => handleDeleteItem(item)}
                          ></div>
                          <img
                            alt={item.name}
                            src={item.image}
                            className="cart__item--img"
                          ></img>
                          <div className="cart__item--name">{item.name}</div>
                        </div>
                        <div className="cart__item__price">
                          <div className="cart__item__buttons">
                            <div className="button__container">
                              <div
                                className="cart__icon
                                 cart__item__buttons--minus"
                                onClick={() => handleQuantityChange(item, -1)}
                              ></div>
                            </div>

                            <div
                              className="button__container
                            button__container--no-border"
                            >
                              <p className="cart__item__buttons--text">
                                {item.quantity}
                              </p>
                            </div>
                            <div
                              className="button__container"
                              onClick={() => handleQuantityChange(item, 1)}
                            >
                              <div
                                className="cart__icon
                              cart__item__buttons--plus"
                              ></div>
                            </div>
                          </div>
                          <p className="cart__item__price-text">
                            ${item.quantity * item.price}
                          </p>
                        </div>
                      </div>
                    </React.Fragment>
                  ))}
                </div>
              </div>
              <div className="cart__total">
                <div className="cart__total--wrapper">
                  <p className="cart__total--full-price">${totalCheckout}</p>
                  <p className="cart__total--amount">
                    Total for {totalItems}{' '}
                    {totalItems === 0 || totalItems === 1 ? 'item' : 'items'}
                  </p>
                  <div className="line"></div>
                  <button
                    className="cart__total--checkout"
                    onClick={() => setModalOpened(true)}
                  >
                    Checkout
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      {modalOpened && (
        <ModalWindow
          isOpen={modalOpened}
          onClose={() => setModalOpened(false)}
        />
      )}
    </>
  );
};
