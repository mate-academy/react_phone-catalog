/* eslint-disable max-len */
/* eslint-disable react/no-unknown-property */
import React, { useState } from 'react';
import { ArrowLeft, ButtonCartDelete } from '../../components/Buttons/Button';
import { Link, useNavigate } from 'react-router-dom';
import { useProduct } from '../../store/Store';

const CartPage: React.FC = () => {
  const navigate = useNavigate();
  const [isModalShow, setIsModalShow] = useState(false);

  const { cart, handleDeleteCart, setCart, totalCount } = useProduct();

  const getTotalPrice = () => {
    return cart.reduce(
      (total, item) => total + item.price * (item.quantity || 1),
      0,
    );
  };

  const handleDecreaseQuantity = (itemId: string) => {
    const updatedCart = cart.map(item =>
      item.itemId === itemId
        ? { ...item, quantity: Math.max((item.quantity || 1) - 1, 1) }
        : item,
    );

    setCart(updatedCart);
  };

  const handleIncreaseQuantity = (itemId: string) => {
    const updatedCart = cart.map(item =>
      item.itemId === itemId
        ? { ...item, quantity: ((item.quantity || 1) as number) + 1 }
        : item,
    );

    setCart(updatedCart);
  };

  const handleCheckout = () => {
    setIsModalShow(true);
  };

  const confirmCheckout = () => {
    setIsModalShow(false);
    setCart([]);
  };

  const cancelCheckout = () => {
    setIsModalShow(false);
  };

  return (
    <div className="container">
      <section className="cart">
        <Link to="/back" className="cart__back" onClick={() => navigate(-1)}>
          <ArrowLeft />
          <div className="cart__back-span">Back</div>
        </Link>

        <h1 className="cart__title">Cart</h1>

        <div className="cart__main">
          {isModalShow || (
            <div className="cart__block">
              {cart.length === 0 ? (
                <h3 className="cart__main-subtitle">Not items on cart</h3>
              ) : (
                <>
                  {cart.map(item => {
                    const { itemId, image, name, price, quantity } = item;

                    return (
                      <div className="cart__product" key={itemId}>
                        <div className="cart__product-top">
                          <ButtonCartDelete
                            handleDeleteCart={handleDeleteCart}
                            product={item}
                          />

                          <Link to={`/products/${itemId}`}>
                            <img
                              src={image}
                              alt="phone"
                              className="cart__product-img"
                            />
                          </Link>

                          <span className="cart__product-title">{name}</span>
                        </div>

                        <div className="cart__product-block">
                          <div className="cart__product-block-temp">
                            <button
                              className="cart__button cart__button-minus"
                              onClick={() => handleDecreaseQuantity(itemId)}
                            >
                              <svg
                                width="32"
                                height="32"
                                viewBox="0 0 32 32"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <rect
                                  x="0.5"
                                  y="0.5"
                                  width="31"
                                  height="31"
                                  rx="15.5"
                                  stroke="#E2E6E9"
                                />
                                <path
                                  fill-rule="evenodd"
                                  clip-rule="evenodd"
                                  d="M10.666 16C10.666 15.6318 10.9645 15.3333 11.3327 15.3333H20.666C21.0342 15.3333 21.3327 15.6318 21.3327 16C21.3327 16.3682 21.0342 16.6666 20.666 16.6666H11.3327C10.9645 16.6666 10.666 16.3682 10.666 16Z"
                                  fill="#B4BDC4"
                                />
                              </svg>
                            </button>

                            <span>{quantity || 1}</span>

                            <button
                              className="cart__button cart__button-plus"
                              onClick={() => handleIncreaseQuantity(itemId)}
                            >
                              <svg
                                width="32"
                                height="32"
                                viewBox="0 0 32 32"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <rect
                                  x="0.5"
                                  y="0.5"
                                  width="31"
                                  height="31"
                                  rx="15.5"
                                  stroke="#B4BDC4"
                                />
                                <path
                                  fill-rule="evenodd"
                                  clip-rule="evenodd"
                                  d="M16.666 11.3334C16.666 10.9652 16.3675 10.6667 15.9993 10.6667C15.6312 10.6667 15.3327 10.9652 15.3327 11.3334V15.3334H11.3327C10.9645 15.3334 10.666 15.6318 10.666 16C10.666 16.3682 10.9645 16.6667 11.3327 16.6667H15.3327V20.6667C15.3327 21.0349 15.6312 21.3334 15.9993 21.3334C16.3675 21.3334 16.666 21.0349 16.666 20.6667V16.6667H20.666C21.0342 16.6667 21.3327 16.3682 21.3327 16C21.3327 15.6318 21.0342 15.3334 20.666 15.3334H16.666V11.3334Z"
                                  fill="#0F0F11"
                                />
                              </svg>
                            </button>
                          </div>

                          <div className="cart__product-price">{`$${price}`}</div>
                        </div>
                      </div>
                    );
                  })}
                </>
              )}
            </div>
          )}

          {cart.length > 0 && !isModalShow && (
            <div className="cart__total">
              <h2 className="cart__total-price">{`$${getTotalPrice()}`}</h2>
              <span className="cart__total-span">{`Total for ${totalCount} items`}</span>

              <span className="cart__total-border"></span>

              <button
                className="button__cart button__cart--large"
                onClick={handleCheckout}
              >
                Checkout
              </button>
            </div>
          )}

          {isModalShow && (
            <div className="cart__modal">
              <div className="cart__modal-content">
                <h2>Checkout</h2>
                <p>
                  Checkout is not implemented yet. Do you want to clear the
                  Cart?
                </p>
                <div className="cart__modal-buttons">
                  <button
                    className="cart__modal-button"
                    onClick={confirmCheckout}
                  >
                    Yes, clear Cart
                  </button>
                  <button
                    className="cart__modal-button"
                    onClick={cancelCheckout}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default CartPage;
