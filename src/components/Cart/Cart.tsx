import './Cart.scss';
import cartIsEmpty from '../../images/cart-is-empty.png';
import arrowLeft from '../../images/icons/arrow-left.png';
import deleteButton from '../../images/icons/delete.png';
import minus from '../../images/icons/minus.png';
import plus from '../../images/icons/plus.png';
import { useContext, useState } from 'react';
import { DevicesContext } from '../../DevicesContext';
import { useNavigate } from 'react-router-dom';

export const Cart = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  const context = useContext(DevicesContext);

  const [isModalOpen, setIsModalOpen] = useState(false);

  if (!context) {
    return <div>Loading...</div>;
  }

  const { cart, setCart } = context;

  const getTotalPrice = () => {
    let total = 0;

    for (const entry of Object.values(cart)) {
      total += entry.item.priceDiscount * entry.quantity;
    }

    return `$${total}`;
  };

  const handleDelete = (id: string) => {
    setCart(prev => {
      const newCart = { ...prev };

      delete newCart[id];

      return newCart;
    });
  };

  const getQuantityOfGoods = () => {
    let quantity = 0;

    for (const value of Object.values(cart)) {
      quantity += value.quantity;
    }

    return quantity;
  };

  const increaseQuantity = (id: string) => {
    setCart(prev => {
      const newCart = { ...prev };

      newCart[id].quantity++;

      return newCart;
    });
  };

  const decreaseQuantity = (id: string) => {
    setCart(prev => {
      if (prev[id].quantity > 1) {
        const newCart = { ...prev };

        newCart[id].quantity--;

        return newCart;
      }

      const newCart = { ...prev };

      delete newCart[id];

      return newCart;
    });
  };

  const handleCheckout = () => {
    setIsModalOpen(true);
  };

  const confirmCheckout = () => {
    setCart({});
    setIsModalOpen(false);
  };

  const cancelCheckout = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="cart">
      {isModalOpen && (
        <div className="cart-modal">
          <div className="cart-modal__content">
            <div className="cart-modal__title">
              Checkout is not implemented yet.
            </div>

            <div className="cart-modal__question">
              Do you want to clear the Cart?
            </div>

            <div className="cart-modal__buttons">
              <button
                className="cart-modal__button cart-modal__button--confirm"
                onClick={confirmCheckout}
              >
                Yes, clear
              </button>

              <button
                className="cart-modal__button cart-modal__button--cancel"
                onClick={cancelCheckout}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="cart__buttons-back">
        <div className="cart__buttons-back__arrow-left">
          <img
            src={arrowLeft}
            className="cart__buttons-back__arrow-left__image"
          />
        </div>

        <div className="buttons-back__button-back" onClick={handleBack}>
          Back
        </div>
      </div>

      <div className="cart__title">Cart</div>

      {Object.keys(cart).length > 0 ? (
        <div className="item-container">
          <div className="cart__items">
            {Object.values(cart).map(value => (
              <div className="item" key={value.item.id}>
                <div className="item__info">
                  <div
                    className="item__info__delete"
                    onClick={() => handleDelete(value.item.id)}
                  >
                    <img
                      src={deleteButton}
                      alt="delete"
                      className="item__info__delete__image"
                    />
                  </div>

                  <div className="item__info__item-image">
                    <img
                      src={value.item.images[0]}
                      className="item__info__item-image__photo"
                    />
                  </div>

                  <div className="item__info__item-title">
                    {value.item.name}
                  </div>
                </div>

                <div className="item__counter-price">
                  <div className="item__counter-price__counter">
                    <div
                      className="item__counter-price__counter__button"
                      onClick={() => decreaseQuantity(value.item.id)}
                    >
                      <img
                        src={minus}
                        alt="minus"
                        className="item__counter-price__counter__button__image"
                      />
                    </div>

                    <div className="item__counter-price__counter__quantity">
                      {value.quantity}
                    </div>

                    <div
                      className="item__counter-price__counter__button"
                      onClick={() => increaseQuantity(value.item.id)}
                    >
                      <img
                        src={plus}
                        alt="plus"
                        className="item__counter-price__counter__button__image"
                      />
                    </div>
                  </div>

                  <div className="item__counter-price__price">
                    {`$${value.item.priceDiscount}`}
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
                {`Total for ${getQuantityOfGoods()} items`}
              </div>
            </div>

            <div className="cart__total__line"></div>

            <div className="cart__total__button" onClick={handleCheckout}>
              Checkout
            </div>
          </div>
        </div>
      ) : (
        <div className="cart-is-empty">
          <img src={cartIsEmpty} className="cart-is-empty__image" />
        </div>
      )}
    </div>
  );
};
