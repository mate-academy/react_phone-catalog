import React, { useContext } from 'react';

import classNames from 'classnames';
import { ShopContext } from '../../cart-context';
import './CartPage.scss';

import { ReactComponent as IconClose } from '../../images/icons/close.svg';
import { ReactComponent as IconMinus } from '../../images/icons/minus.svg';
import { ReactComponent as IconPlus } from '../../images/icons/plus.svg';

import { ErrorMessage } from '../../components/ErrorMessage/ErrorMessage';
import { onBackClicked } from '../../helpers/consts';

export const CartPage: React.FC = () => {
  const {
    increaseAmount, decreaseAmount, removeFromCart, cartItems,
  }
    = useContext(ShopContext);

  let totalCost = 0;
  let totalAmount = 0;

  if (cartItems.length === 0) {
    return (
      <ErrorMessage message="The cart is empty" />
    );
  }

  return (
    <div className="cart-page">
      <div className="cart-page__container">
        <div className="path">
          <button
            className="path__text"
            onClick={onBackClicked}
            style={{ cursor: 'pointer' }}
            type="button"
          >
            Back
          </button>
        </div>

        <h1 className="cart-page__title">Cart</h1>

        <div className="cart-page__content">
          <div className="cart-page__cart-items">
            {cartItems.map((cartItem) => {
              if (cartItem.product) {
                const {
                  name, imageUrl, price, discount,
                } = cartItem.product;
                const { quantity, id } = cartItem;

                const finalPrice = price * (1 - discount / 100);

                totalAmount += quantity;
                totalCost += finalPrice * quantity;

                const decreaseButtonDisabled = quantity === 1;

                return (
                  <div className="cart-item">
                    <IconClose
                      className="cart-item__button cart-item__button--remove"
                      data-cy="cartDeleteButton"
                      onClick={() => removeFromCart(id)}
                    />

                    <img
                      src={`./${imageUrl}`}
                      alt={name}
                      className="cart-item__img"
                    />

                    <div className="cart-item__name">{name}</div>

                    <button
                      className={classNames('cart-item__change-quantity', {
                        'cart-item__change-quantity--disabled':
                          decreaseButtonDisabled,
                      })}
                      onClick={() => decreaseAmount(id)}
                      disabled={decreaseButtonDisabled}
                      type="button"
                    >
                      <IconMinus
                        className={classNames(
                          'cart-item__button-change-quantity',
                          {
                            'cart-item__button-change-quantity--disabled':
                              decreaseButtonDisabled,
                          },
                        )}
                      />
                    </button>

                    <div
                      className="cart-item__quantity"
                      data-cy="productQauntity"
                    >
                      {quantity}
                    </div>

                    <button
                      className="cart-item__change-quantity"
                      onClick={() => increaseAmount(id)}
                      type="button"
                    >
                      <IconPlus className="cart-item__button-change-quantity" />
                    </button>
                    <div className="cart-item__price">{`$${finalPrice}`}</div>
                  </div>
                );
              }

              return null;
            })}
          </div>

          {!!totalAmount && (
            <div className="cart-page__checkout-container">
              <div className="cart-page__total-cost">{`$${totalCost}`}</div>
              <div className="cart-page__items-amount">
                {totalAmount === 1
                  ? 'total for 1 item'
                  : `total for ${totalAmount} items`}
              </div>

              <div className="cart-page__checkout-button">Checkout</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
