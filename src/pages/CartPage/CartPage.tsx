/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames';
import { StorageContext } from '../../components/StorageContext';
import { CartItemType } from '../../types/CartItemType';
import { CartItem } from '../../components/CartItem';

type CartPageProps = {
  setCartLength: React.Dispatch<number>,
};

export const CartPage: React.FC<CartPageProps> = ({
  setCartLength,
}) => {
  const navigate = useNavigate();
  const [isMessage, setIsMessage] = useState(false);
  const { cart, cartSum } = useContext(StorageContext);

  useEffect(() => {
    let changeMessageVisibility: NodeJS.Timeout;

    if (isMessage) {
      changeMessageVisibility = setTimeout(() => {
        setIsMessage(false);
      }, 5000);
    }

    return () => {
      clearTimeout(changeMessageVisibility);
    };
  }, [isMessage]);

  useEffect(() => {
    setCartLength(cartSum(cart));
  }, [cart]);

  return (
    <div className="cart-page">
      {cart.length > 0
        ? (
          <>
            <div
              className="back-button"
              data-cy="backButton"
              onClick={() => navigate(-1)}
            >
              <img
                src="_new/img/arrow-left-black.svg"
                alt="arrow back"
                className="back-button-arrow"
              />
              <div
                className="back-button-text"
              >
                Back
              </div>
            </div>

            <div className="cart-page__title">
              Cart
            </div>

            <div
              className="cart-page__info"
            >
              <div className="cart-page__info-items">
                {cart.map((item: CartItemType) => (
                  <CartItem
                    key={item.id}
                    cartItem={item}
                    setCartLength={setCartLength}
                  />
                ))}
              </div>

              <div className="cart-page__info-container">
                <div
                  className="cart-page__info-total"
                >
                  <div className="cart-page__info-total-top">
                    <div className="cart-page__info-total-top-price">
                      {`$${cartSum(cart, false)}`}
                    </div>
                    <div
                      className="cart-page__info-total-top-quantity"
                      data-cy="productQauntity"
                    >
                      {`Total for ${cartSum(cart)} items`}
                    </div>
                  </div>

                  <div
                    className="cart-page__info-total-checkout"
                    onClick={() => setIsMessage(true)}
                  >
                    Checkout
                  </div>
                </div>

                <div className="cart-page__info-message-container">
                  <div
                    className={classNames('cart-page__info-message', {
                      'cart-page__info-message--off': !isMessage,
                    })}
                  >
                    <div className="cart-page__info-message-button">
                      <img
                        src="_new/img/Close.svg"
                        alt="close button for message"
                        className="cart-page__info-message-button-picture"
                        onClick={() => setIsMessage(false)}
                      />
                    </div>

                    <div className="cart-page__info-message-text">
                      We are sorry, but this feature is not implemented yet
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )
        : (
          <div className="cart-page__empty-cart">
            Your cart is empty
          </div>
        )}
    </div>
  );
};
