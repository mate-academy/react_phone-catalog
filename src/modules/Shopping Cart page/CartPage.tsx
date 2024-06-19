import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CartPage.scss';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  deleteFromCart,
  minusQuantity,
  plusQuantity,
} from '../../features/User/userSlice';
import { ProductType } from '../../types/ProductType';
import Modal from './components/Modal/Modal';

export const CartPage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { cart } = useAppSelector(state => state.user);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const totalPrice = cart.reduce(
    (acc, product) => acc + (product.price || 0) * (product.quantity || 1),
    0,
  );
  const totalAmount = cart.reduce(
    (acc, product) => acc + (product.quantity || 1),
    0,
  );

  const handleGoBack = () => {
    navigate(-1);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleDeleteFromCart = (itemId: string) => {
    dispatch(deleteFromCart(itemId));
  };

  const handlePlusQuantity = (product: ProductType) => {
    dispatch(plusQuantity(product));
  };

  const handleMinusQuantity = (product: ProductType) => {
    dispatch(minusQuantity(product));
  };

  return (
    <section className="cart container">
      {cart.length === 0 ? (
        <div className="favorites__empty">
          <img
            className="favorites__empty"
            src="img/cart-is-empty.png"
            alt="cart-is-empty"
          />
          <h1 className="favorites__title">Cart is empty</h1>
        </div>
      ) : (
        <>
          <div className="cart__back">
            <img
              src="img/slider/svg/chevron (arrow left).svg"
              alt="chevron_left"
            />
            <span onClick={handleGoBack} className="details__link">
              Back
            </span>
          </div>

          <h1 className="cart__title">Cart</h1>

          <div className="cart__block">
            <div className="item__block">
              {cart.map(product => (
                <article key={product.id} className="item">
                  <div className="item__info">
                    <img
                      src="img/cart/close.svg"
                      alt="close"
                      className="item__info--close"
                      onClick={() => handleDeleteFromCart(product.itemId)}
                    />
                    <img
                      src={product?.image}
                      alt={product?.name || 'Product image'}
                      className="item__info--product"
                    />
                    <span className="item__info--name">{product?.name}</span>
                  </div>
                  <div className="item__amount">
                    <div className="item__amount--count">
                      <button
                        className="item__amount--count-button"
                        onClick={() => handleMinusQuantity(product)}
                      >
                        <img src="img/cart/minus.svg" alt="minus" />
                      </button>
                      <span className="item__amount--count-number">
                        {product.quantity}
                      </span>
                      <button
                        className="item__amount--count-button"
                        onClick={() => handlePlusQuantity(product)}
                      >
                        <img src="img/cart/plus.svg" alt="plus" />
                      </button>
                    </div>
                    <span className="item__amount--price">
                      ${product?.price}
                    </span>
                  </div>
                </article>
              ))}
            </div>
            <div className="cart__total">
              <span className="cart__total--total">
                ${totalPrice.toFixed(2)}
              </span>
              <span className="cart__total--text">
                Total for {totalAmount} items
              </span>
              <div className="cart__line"></div>
              <button className="cart__checkout" onClick={openModal}>
                Checkout
              </button>
            </div>
          </div>
          <Modal isOpen={isModalOpen} onClose={closeModal} />
        </>
      )}
    </section>
  );
};
