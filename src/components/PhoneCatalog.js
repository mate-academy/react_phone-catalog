import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const PhoneCatalog = ({
  phones,
  addPhone,
  selectedPhones,
  increaseQuantity,
  decreaseQuantity,
}) => (
  <section className="phones-catalog">
    <h1>Phones</h1>

    <div className="phone-cards-wrapper">
      {phones.map(phone => (
        <article
          key={phone.id}
          className="phone-card"
        >
          <div className="phone-card__wrapper">
            <Link to={`/details/${phone.id}`}>
              <img
                src={phone.imageUrl}
                alt="phone"
                className="phone-card__img"
              />
            </Link>

            <Link
              to={`/details/${phone.id}`}
              className="phone-card__title"
            >
              {phone.name}
            </Link>

            {selectedPhones.find(item => item.id === phone.id)
              ? (
                <>
                  {(function() {
                    const foundPhone = selectedPhones
                      .find(item => item.id === phone.id);

                    return (
                      <div
                        key={foundPhone.id}
                        className="phone-card__quantity-btns"
                      >
                        <button
                          type="button"
                          name="-"
                          className="
                          cart-btn
                          phone-card__quantity-btns-btn
                          quantity-btn
                          "
                          onClick={() => decreaseQuantity(foundPhone.id)}
                        >
                          -
                        </button>

                        <div className="phone-card__quantity">
                          {`${foundPhone.quantity}
                            ${foundPhone.quantity > 1 ? 'items' : 'item'}
                          `}
                        </div>

                        <button
                          type="button"
                          name="+"
                          className="
                          cart-btn
                          phone-card__quantity-btns-btn
                          quantity-btn
                          "
                          onClick={() => increaseQuantity(foundPhone.id)}
                        >
                          +
                        </button>
                      </div>
                    );
                  }())}
                </>
              ) : (
                <button
                  type="button"
                  className="cart-btn"
                  onClick={() => addPhone(phone)}
                >
                  Add to basket
                </button>
              )
            }

            <div className="phone-card__description-wrapper">
              <p className="phone-card__description">
                {phone.snippet}
              </p>
            </div>
          </div>
        </article>
      ))}
    </div>
  </section>
);

PhoneCatalog.propTypes = {
  phones: PropTypes.arrayOf(PropTypes.object).isRequired,
  addPhone: PropTypes.func.isRequired,
  increaseQuantity: PropTypes.func.isRequired,
  decreaseQuantity: PropTypes.func.isRequired,
  selectedPhones: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default PhoneCatalog;
