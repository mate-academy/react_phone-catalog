import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import classNames from 'classnames';
import arrowLeft from '../../images/arrow-left-black.svg';
import { useProducts } from '../../helpers/CatalogContext/CatalogContext';

export const CartPage: React.FC = () => {
  const navigate = useNavigate();
  const { cartPhones, setCartPhones } = useProducts();

  const [checkOutIsClicked, setCheckOutIsClicked] = useState(false);

  const handleCheckOut = () => {
    setCheckOutIsClicked(true);

    setTimeout(() => {
      setCheckOutIsClicked(false);
    }, 3000);
  };

  const totalPrice = cartPhones.reduce(
    (acc, phone) => (+acc) + (+(phone.product.price) * phone.quantity), 0,
  );

  const totalAmount = cartPhones.reduce(
    (acc, phone) => (+acc) + phone.quantity, 0,
  );

  const deleteFromCart = (id: string) => {
    const newPhones = cartPhones.filter(phone => phone.id !== id);

    setCartPhones(newPhones);
  };

  const addPhone = (id: string) => {
    const newPhones = cartPhones.map(phone => {
      if (phone.id === id) {
        return { ...phone, quantity: phone.quantity + 1 };
      }

      return phone;
    });

    setCartPhones(newPhones);
  };

  const subtractPhone = (id: string) => {
    const newPhones = cartPhones.map(phone => {
      if (phone.id === id && phone.quantity > 1) {
        return { ...phone, quantity: phone.quantity - 1 };
      }

      return phone;
    });

    setCartPhones(newPhones);
  };

  return (
    <>
      <div className="cart-container">
        <button
          type="button"
          className="left-back"
          onClick={() => navigate(-1)}
          data-cy="backButton"
        >
          <img src={arrowLeft} alt="arrow_right" />
          <p>Back</p>
        </button>
        <h1 className="cart-title">Cart</h1>
        {cartPhones.length > 0 ? (
          <div className="cart">
            <ul className="cart__list">
              {cartPhones.map(phone => {
                const { image, name, price } = phone.product;

                return (
                  <li className="cart__item" key={phone.id}>
                    <div className="cart__item--first-half">
                      <button
                        type="button"
                        className="cart__button cart__delete"
                        aria-label="delete"
                        onClick={() => deleteFromCart(phone.id)}
                        data-cy="cartDeleteButton"
                      />
                      <img
                        className="cart__image"
                        src={image}
                        alt={name}
                      />
                      <div>{phone.product.name}</div>
                    </div>
                    <div className="cart__item--second-half">
                      <button
                        type="button"
                        aria-label="decrease"
                        className={classNames('cart__button cart__minus', {
                          'cart__minus--disabled': phone.quantity === 1,
                        })}
                        onClick={() => subtractPhone(phone.id)}
                      />
                      <div className="cart__quantity">{phone.quantity}</div>
                      <button
                        onClick={() => addPhone(phone.id)}
                        type="button"
                        aria-label="increase"
                        className="cart__button cart__plus"
                      />
                      <div className="cart__phone-price">{`$${price}`}</div>
                    </div>
                  </li>
                );
              })}
            </ul>
            <div className="cart__aside">
              <div className="cart__price-container">
                <div className="cart__total-price">{`$${totalPrice}`}</div>
                <div
                  className="cart__total"
                  data-cy="productQauntity"
                >
                  {totalAmount === 1
                    ? `Total for ${totalAmount} item`
                    : `Total for ${totalAmount} items`}
                </div>
              </div>
              <div
                className="cart__checkout card__link"
                onClick={handleCheckOut}
                role="presentation"
              >
                {checkOutIsClicked
                  ? 'We are sorry, but this feature is not implemented yet'
                  : 'Checkout'}
              </div>
            </div>
          </div>
        ) : (
          <h2>Your cart is empty</h2>
        )}
      </div>
    </>
  );
};
