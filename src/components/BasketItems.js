import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const BasketItems = (props) => {
  const { basketPhones, chandgeBasketItems } = props;

  const changeBasketPhones = (basketPhone, phoneId, operand) => (
    basketPhone.id === phoneId
      ? {
        ...basketPhone,
        quantity: operand === '-'
          ? (basketPhone.quantity - 1)
          : (basketPhone.quantity + 1),
      }
      : basketPhone);

  const plusMinusBasketItem = (phones, phoneId, operand) => (
    phones.map(basketPhone => (
      changeBasketPhones(basketPhone, phoneId, operand))));

  const deleteBasketItem = (phones, phoneId) => (
    phones.filter(basketPhone => basketPhone.id !== phoneId));

  return (
    <main className="main-container">
      <h2>
        Chosen phones:
        {' '}
        {' '}
        {basketPhones.length}
      </h2>

      <ul className="basket__card-list">
        {basketPhones.map(phone => (
          <li key={phone.id} className="basket__card-item">
            <div className="basket__preview-name-container">
              <div className="basket__card-image">
                <Link to={`/phones/${phone.id}`}>
                  <img src={phone.imageUrl} alt="phone" width="100" />
                </Link>
              </div>

              <h3 className="basket__item-header">
                <Link to={`/phones/${phone.id}`}>
                  {phone.name}
                </Link>
              </h3>
            </div>

            <p>{phone.snippet}</p>

            <div className="phone__buttons">
              <button
                name={phone.id}
                type="button"
                className={
                  phone.quantity > 1
                    ? 'button button--basket'
                    : 'button button--basket button--basket-disabled'
                }
                onClick={() => {
                  if (phone.quantity > 1) {
                    localStorage.setItem('basketPhones', JSON.stringify(
                      plusMinusBasketItem(basketPhones, phone.id, '-')
                    ));

                    return chandgeBasketItems(
                      plusMinusBasketItem(basketPhones, phone.id, '-')
                    );
                  }

                  return basketPhones;
                }}
              >
                -
              </button>

              <p className="basket__item-quantity">
                {phone.quantity}
              </p>

              <button
                name={phone.id}
                type="button"
                className="button button--basket"
                onClick={() => {
                  localStorage.setItem('basketPhones', JSON.stringify(
                    plusMinusBasketItem(basketPhones, phone.id, '+')
                  ));

                  return chandgeBasketItems(
                    plusMinusBasketItem(basketPhones, phone.id, '+')
                  );
                }}
              >
                +
              </button>

              <button
                name={phone.id}
                type="button"
                className="button button--basket-delete"
                onClick={() => {
                  localStorage.setItem('basketPhones', JSON.stringify(
                    deleteBasketItem(basketPhones, phone.id)
                  ));

                  return chandgeBasketItems(
                    deleteBasketItem(basketPhones, phone.id)
                  );
                }}
              >
                  X
              </button>
            </div>
          </li>
        ))}
      </ul>

      <div className={basketPhones.length > 0
        ? 'basket__controls'
        : 'basket__controls--center'}
      >
        {
          basketPhones.length > 0
            && (
              <button
                type="button"
                onClick={() => {
                  localStorage.setItem('basketPhones', JSON.stringify(
                    basketPhones.filter(basketPhone => null)
                  ));

                  return chandgeBasketItems(basketPhones
                    .filter(basketPhone => null));
                }}
                className="button button--delete-all-items"
              >
                Delete all Items from Basket
              </button>
            )
        }

        <Link
          to="/phones"
          className="button"
        >
          Back to Catalog
        </Link>
      </div>
    </main>
  );
};

BasketItems.propTypes = {
  basketPhones: PropTypes.arrayOf(PropTypes.object).isRequired,
  chandgeBasketItems: PropTypes.func.isRequired,
};

export default BasketItems;
