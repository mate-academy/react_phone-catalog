import React from 'react';
import PropTypes from 'prop-types';
import BasketEmail from './BasketEmail';
import './BasketRegister.scss';

import './BasketCard.scss';
import SendEmail from './SendEmail';

const BasketRegister = ({
  phonesToBasket,
  openRegister,
  handleOpenRegistr,
  handleOpenFinishWindow,
  isLoaded,
  handleClose,
  handleCloseRegister,
}) => {
  let totalPrice = 0;

  for (let i = 0; i < phonesToBasket.length; i += 1) {
    totalPrice += phonesToBasket[i].cost * phonesToBasket[i].quantity;
  }

  return (
    <>
      <div className="login-box">
        <div className="login_display">
          <form className="login-form" action="index.html" method="post">
            <div>
              <h1>Total Price</h1>
            </div>
            <p>{totalPrice.toFixed(2)}</p>
            <button
              onClick={handleOpenRegistr}
              type="button"
              className="show-login-btn button_pop_up"
            >
      Pop Up
            </button>
          </form>
        </div>
      </div>
      {
        phonesToBasket.length !== 0 && openRegister
          ? (
            <BasketEmail
              openRegister={openRegister}
              handleOpenFinishWindow={handleOpenFinishWindow}
              isLoaded={isLoaded}
              handleCloseRegister={handleCloseRegister}
            />
          )
          : ''
      }
      {
        isLoaded
          ? (<SendEmail handleClose={handleClose} />
          )
          : ''
      }

    </>
  );
};

BasketRegister.propTypes = {
  phonesToBasket: PropTypes.shape().isRequired,
  openRegister: PropTypes.bool.isRequired,
  handleOpenRegistr: PropTypes.func.isRequired,
  handleOpenFinishWindow: PropTypes.func.isRequired,
  isLoaded: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  handleCloseRegister: PropTypes.func.isRequired,
};

export default BasketRegister;
