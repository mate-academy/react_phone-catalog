/* eslint-disable max-len */
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import cn from 'classnames';

import './index.scss';
import { StateStore } from '../../store/StoreContext';
import { Action } from '../../types/Action';
import { ProductExtended } from '../../types/ProductExtended';
import { ICONS } from '../../images';
import { BASE_API_URL } from '../../utils/fetch';

export const CartPage = () => {
  const navigate = useNavigate();

  const { localStorage, actionHandler } = useContext(StateStore);

  const [message, setMessage] = useState(false);

  const cartProducts = [...localStorage].filter(product => product.addedToCart);
  const totalCartPrice = cartProducts.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );
  const totalCartQuantity = cartProducts.reduce(
    (acc, item) => acc + item.quantity,
    0,
  );

  const removeProduct = (product: ProductExtended) => {
    actionHandler(product, Action.removeFromCart);
  };

  const decreaseQuantity = (product: ProductExtended) => {
    actionHandler(product, Action.decreaseQuantity);
  };

  const increaseQuantity = (product: ProductExtended) => {
    actionHandler(product, Action.increaseQuantity);
  };

  const showMessageHandler = () => {
    setMessage(!message);
  };

  return (
    <div className="cartPage">
      <section className="cartPage__nav">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="button cartPage__nav__link"
          data-cy="backButton"
        >
          <img src={ICONS.arrowLeft} alt="Back" />
          <p className="cartPage__nav__link__text text">Back</p>
        </button>
      </section>

      <section className="cartPage__content">
        {!cartProducts.length ? (
          <h1>Your cart is empty</h1>
        ) : (
          <>
            <div className="cartPage__content__title">
              <h1>Cart</h1>
            </div>

            <div className="cartPage__content__products">
              <ul className="cartPage__content__products__list">
                {cartProducts.map(product => {
                  const { name, image, quantity, price } = product;

                  const fullPrice = price * quantity;

                  return (
                    <li
                      key={name}
                      className="cartPage__content__products__item"
                    >
                      <button
                        data-cy="cartDeleteButton"
                        type="button"
                        className="button cartPage__content__products__item__button"
                        onClick={() => removeProduct(product)}
                      >
                        <img src={ICONS.close} alt="Remove" />
                      </button>

                      <img
                        src={`${BASE_API_URL + image}`}
                        alt="Phone"
                        className="cartPage__content__products__item__image"
                      />

                      <p className="cartPage__content__products__item__name">
                        {name}
                      </p>

                      <div className="cartPage__content__products__item__quantity">
                        <button
                          type="button"
                          onClick={() => decreaseQuantity(product)}
                          disabled={quantity === 1}
                          className={cn('smallButton', {
                            'smallButton--disabled': quantity === 1,
                          })}
                        >
                          <img src={ICONS.minus} alt="Minus" />
                        </button>
                        <p
                          data-cy="productQauntity"
                          className="cartPage__content__products__item__quantity__counter"
                        >
                          {quantity}
                        </p>
                        <button
                          type="button"
                          onClick={() => increaseQuantity(product)}
                          className="smallButton"
                        >
                          <img src={ICONS.plus} alt="Plus" />
                        </button>
                      </div>

                      <h2 className="cartPage__content__products__item__price">{`$${fullPrice}`}</h2>
                    </li>
                  );
                })}
              </ul>

              <div className="cartPage__content__products__checkout">
                <h1 className="cartPage__content__products__checkout__total">
                  {`$${totalCartPrice}`}
                </h1>

                <p className="cartPage__content__products__checkout__counter">
                  {totalCartQuantity === 1
                    ? `Total for ${totalCartQuantity} item`
                    : `Total for ${totalCartQuantity} items`}
                </p>

                <div className="cartPage__content__products__checkout__divider" />

                <button
                  type="button"
                  className="button cartPage__content__products__checkout__button"
                  onClick={showMessageHandler}
                >
                  Checkout
                </button>

                {message && (
                  <p className="cartPage__content__products__checkout__message text">
                    We are sorry, but this feature is not implemented yet
                  </p>
                )}
              </div>
            </div>
          </>
        )}
      </section>
    </div>
  );
};
