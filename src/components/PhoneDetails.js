import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { withRouter } from 'react-router-dom';

import PhoneSpecifications from './PhoneSpecifications';

const PhoneDetails = ({
  details,
  addPhone,
  selectedPhones,
  history,
  increaseQuantity,
  decreaseQuantity,
}) => {
  const [imageNumber, setImageNumber] = useState(0);

  return (
    <div className="phone">
      <div className="phone__wrapper">
        <div className="phone__main-info">
          <div className="phone__images">
            {details.images.map((image, index) => (
              <img
                className={classnames('phone__images-img', {
                  'phone__images-img-selected': imageNumber === index,
                })}
                src={image}
                alt="phone"
                key={image}
              />
            ))}
          </div>

          <h2 className="phone__title">{details.name}</h2>

          <p className="phone__description">{details.description}</p>

          <ul className="phone-thumbs">
            {details.images.map((image, index) => (
              <li key={image}>
                <img
                  onClick={() => setImageNumber(index)}
                  className={classnames('phone-thumbs__img', {
                    'phone-thumbs__img-selected': imageNumber === index,
                  })}
                  src={image}
                  alt="phone"
                />
              </li>
            ))}
          </ul>

          <div className="phone__btns">
            {selectedPhones.find(item => item.id === details.id)
              ? (
                <>
                  {(function() {
                    const foundPhone = selectedPhones
                      .find(item => item.id === details.id);

                    return (
                      <div
                        key={foundPhone.id}
                        className="phone__quantity-btns-wrapper"
                      >
                        <div className="quantity-btns">
                          <button
                            type="button"
                            name="-"
                            className="
                            cart-btn
                            phone-card__minus-btn
                            quantity-btns__btn
                            "
                            onClick={() => decreaseQuantity(foundPhone.id)}
                          >
                            -
                          </button>

                          <div className="phone__quantity">
                            {`${foundPhone.quantity}
                              ${foundPhone.quantity > 1 ? 'items' : 'item'}
                            `}
                          </div>

                          <button
                            type="button"
                            name="+"
                            className="
                            cart-btn
                            phone-card__plus-btn
                            quantity-btns__btn
                            "
                            onClick={() => increaseQuantity(foundPhone.id)}
                          >
                            +
                          </button>
                        </div>
                      </div>
                    );
                  }())}
                </>
              ) : (
                <button
                  type="button"
                  className="cart-btn return-and-add-btn"
                  onClick={() => addPhone(details)}
                >
                  Add to basket
                </button>
              )
            }

            <button
              type="button"
              className="cart-btn return-and-add-btn"
              onClick={() => history.goBack()}
            >
              Return to catalog
            </button>
          </div>
        </div>

        <PhoneSpecifications
          details={details}
        />
      </div>
    </div>
  );
};

PhoneDetails.propTypes = {
  details: PropTypes.objectOf(PropTypes.object).isRequired,
  addPhone: PropTypes.func.isRequired,
  increaseQuantity: PropTypes.func.isRequired,
  decreaseQuantity: PropTypes.func.isRequired,
  selectedPhones: PropTypes.arrayOf(PropTypes.object).isRequired,
  history: PropTypes.shape({
    goBack: PropTypes.func.isRequired,
  }).isRequired,
};

export default withRouter(PhoneDetails);
