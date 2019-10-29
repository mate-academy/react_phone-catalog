import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import BasketRegister from './BasketRegister';

import './scss/BasketItems.scss';

const BasketItems = ({
  phonesToBasket,
  handleBasket,
  isopenRegister,
  handleOpenRegistr,
  isLoaded,
  handleOpenFinishWindow,
  handleClose,
  handleCloseRegister,
}) => (
  <div className="basket__wrapper__main">
    {phonesToBasket.length === 0
      ? (
        <NavLink
          to="/phones"
          className="phones__page"
          activeClassName="phoneClassActive"
        >
          <h1 className="basket__empty">Basket is empty</h1>
          Go to Catalog
        </NavLink>
      )
      : (
        <div className="basket__table">
          <div className="basket__table-thead">
            <div className="basketPage__table-thead-td">Delivery</div>
            <div className="basketPage__table-thead-td">Count</div>
          </div>
          <div className="basket__cart-products__content">
            {
              phonesToBasket.map((phone, index) => (
                <div
                  key={phone.id}
                  className="basketPage__cart-products__card-row"
                >
                  <div className="basketPage__prime-container">
                    <div className="basketPage__table-tbody-td">
                      {index + 1}
                      <div className="basketPage__name">
                        {phone.phone}
                      </div>
                    </div>
                    <div
                      className="basketPage__table-tbody-td basketPage__cost"
                    >
                      {(phone.cost * phone.quantity).toFixed(2)}
                    </div>
                  </div>
                  <div className="basketPage__plus-minus">
                    <div className="basketPage__table-tbody-td">
                      <button
                        type="button"
                        onClick={() => handleBasket(phone.id, 'decrease')}
                        className="basketPage__table-quantity-minus"
                      >
                   -
                      </button>
                    </div>
                    <div className="basketPage__table-tbody-td">
                      <p className="basket__button__title">{phone.quantity}</p>
                    </div>
                    <div className="basketPage__table-tbody-td">
                      <button
                        type="button"
                        onClick={() => handleBasket(phone.id, 'increase')}
                        className="basketPage__table-quantity-plus"
                      >
                   +
                      </button>
                    </div>
                    <div>
                      <button
                        type="button"
                        onClick={() => handleBasket(phone.id, 'remove')}
                        className="basketPage__table-quantity-remove"
                      >
                   x
                      </button>
                    </div>
                  </div>
                </div>
              ))
            }
          </div>
          <NavLink
            to="/phones"
            className="phones__page"
            activeClassName="phoneClassActive"
          >
         go to Catalog
          </NavLink>

        </div>
      )
    }
    <BasketRegister
      phonesToBasket={phonesToBasket}
      isopenRegister={isopenRegister}
      handleBasket={handleBasket}
      handleOpenRegistr={handleOpenRegistr}
      isLoaded={isLoaded}
      handleOpenFinishWindow={handleOpenFinishWindow}
      handleClose={handleClose}
      handleCloseRegister={handleCloseRegister}
    />
  </div>
);

BasketItems.propTypes = {
  phonesToBasket: PropTypes.shape().isRequired,
  handleBasket: PropTypes.func.isRequired,
  handleOpenRegistr: PropTypes.func.isRequired,
  isopenRegister: PropTypes.bool.isRequired,
  handleOpenFinishWindow: PropTypes.func.isRequired,
  isLoaded: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  handleCloseRegister: PropTypes.func.isRequired,
};

export default BasketItems;
