import './Cart.scss';
import arrowLeft from '../../images/icons/arrow-left.png';
import deleteButton from '../../images/icons/delete.png';
import minus from '../../images/icons/minus.png';
import plus from '../../images/icons/plus.png';
import { useContext } from 'react';
import { DevicesContext } from '../../DevicesContext';

export const Cart = () => {
  const context = useContext(DevicesContext);

  if (!context) {
    return <div>Loading...</div>;
  }

  const { phones } = context;
  const cart = [...phones].slice(0, 5);

  const getTotalPrice = () => {
    let sum = 0;

    for (let i = 0; i < cart.length; i++) {
      sum += cart[i].priceDiscount;
    }

    return `$${sum}`;
  };

  return (
    <div className="cart">
      <div className="cart__buttons-back">
        <div className="cart__buttons-back__arrow-left">
          <img
            src={arrowLeft}
            className="cart__buttons-back__arrow-left__image"
          />
        </div>

        <div className="buttons-back__button-back">Back</div>
      </div>

      <div className="cart__title">Cart</div>

      <div className="item-container">
        <div className="cart__items">
          {cart.map(item => (
            <div className="item" key={item.id}>
              <div className="item__info">
                <div className="item__info__delete">
                  <img
                    src={deleteButton}
                    alt="delete"
                    className="item__info__delete__image"
                  />
                </div>

                <div className="item__info__item-image">
                  <img
                    src={
                      item.images[0].startsWith('/')
                        ? item.images[0]
                        : `/${item.images[0]}`
                    }
                    className="item__info__item-image__photo"
                  />
                </div>

                <div className="item__info__item-title">{item.name}</div>
              </div>

              <div className="item__counter-price">
                <div className="item__counter-price__counter">
                  <div className="item__counter-price__counter__button">
                    <img
                      src={minus}
                      alt="minus"
                      className="item__counter-price__counter__button__image"
                    />
                  </div>

                  <div className="item__counter-price__counter__quantity">
                    1
                  </div>

                  <div className="item__counter-price__counter__button">
                    <img
                      src={plus}
                      alt="plus"
                      className="item__counter-price__counter__button__image"
                    />
                  </div>
                </div>

                <div className="item__counter-price__price">
                  {`$${item.priceDiscount}`}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="cart__total">
          <div className="cart__total__price">
            <div className="cart__total__price__total-price">
              {getTotalPrice()}
            </div>
            <div className="cart__total__price__total-items">
              {`Total for ${cart.length} items`}
            </div>
          </div>

          <div className="cart__total__line"></div>

          <div className="cart__total__button">Checkout</div>
        </div>
      </div>
    </div>
  );
};
