import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const BasketItems = (props) => {
  const { basketPhones, chandgeBasketItems } = props;

  return (
    <div>
      <h2>
        Chosen phones:
        {basketPhones.length}
      </h2>

      <ul className="phone__card-list">
        {basketPhones.map(phone => (
          <li key={phone.id} className="phone__card-item">
            <div>
              <div>
                <img src={phone.imageUrl} alt="phone" width="100" />
              </div>

              <Link to={`/phones/${phone.id}`}>
                {phone.name}
              </Link>

              <p>{phone.snippet}</p>
              <p>
                quantity:
                {phone.quantity}
              </p>
            </div>

            <div className="phone__buttons">
              <button
                name={phone.id}
                type="button"
                className="button"
                onClick={() => {
                  if (phone.quantity > 1) {
                    chandgeBasketItems(basketPhones
                      .map(basketPhone => (
                        basketPhone.id === phone.id
                          ? {
                            ...basketPhone,
                            quantity: basketPhone.quantity - 1,
                          }
                          : basketPhone)));
                  }

                  return basketPhones;
                }}
              >
                  -
              </button>

              <button
                name={phone.id}
                type="button"
                className="button"
                onClick={() => chandgeBasketItems(basketPhones
                  .map(basketPhone => (
                    basketPhone.id === phone.id
                      ? {
                        ...basketPhone,
                        quantity: basketPhone.quantity + 1,
                      }
                      : basketPhone)))}
              >
                  +
              </button>

              <button
                name={phone.id}
                type="button"
                className="button"
                onClick={() => chandgeBasketItems(basketPhones
                  .filter(basketPhone => basketPhone.id !== phone.id))}
              >
                  X
              </button>
            </div>
          </li>
        ))}
      </ul>

      {
        basketPhones.length > 0
          && (
            <button
              type="button"
              onClick={() => chandgeBasketItems(basketPhones
                .filter(i => false))}
            >
            Delete all Items from Card
            </button>
          )
      }

      <Link to="/phones">Back to Catalog</Link>
    </div>
  );
};

BasketItems.propTypes = {
  basketPhones: PropTypes.arrayOf(PropTypes.object).isRequired,
  chandgeBasketItems: PropTypes.func.isRequired,
};

export default BasketItems;
