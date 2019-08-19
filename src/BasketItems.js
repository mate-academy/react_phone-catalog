import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

const BasketItems = ({ phonesToBasket, handleBasket }) => (
  <div className="basket__wrapper__main">
    {phonesToBasket.length === 0
      ? (
        <NavLink
          to="/phones"
          className="Phones__page"
          activeClassName="phoneClassActive"
        >
          <h1 className="basket__empty">Basket is empty</h1>
          Go to Catalog
        </NavLink>
      )
      : (
        <table className="basket__table">
          <thead className="basket__table-thead">
            <tr>
              <td className="basketPage__table-thead-td">
              Delivery
              </td>
              <td />
              <td className="basketPage__table-thead-td">Count</td>
            </tr>
          </thead>
          <tbody>
            {
              phonesToBasket.map((phone, index) => (
                <tr className="basketPage__table-tbody-tr">
                  <td className="basketPage__table-tbody-td">
                    {index + 1}
                  </td>
                  <td className="basketPage__table-tbody-td">
                    {phone.phone}
                  </td>
                  <td className="basketPage__table-tbody-td">
                    <button
                      type="button"
                      onClick={() => handleBasket(phone.id, 'decrease')}
                      className="basketPage__table-quantity-minus"
                    >
                 -
                    </button>
                    <p className="basket__button__title">{phone.quantity}</p>
                    <button
                      type="button"
                      onClick={() => handleBasket(phone.id, 'increase')}
                      className="basketPage__table-quantity-plus"
                    >
                 +
                    </button>
                  </td>
                  <td>
                    <button
                      type="button"
                      onClick={() => handleBasket(phone.id, 'remove')}
                      className="basketPage__table-quantity-remove"
                    >
                 x
                    </button>
                  </td>
                </tr>
              ))

            }
            <NavLink
              to="/phones"
              className="Phones__page"
              activeClassName="phoneClassActive"
            >
         go to Catalog
            </NavLink>
          </tbody>

        </table>
      )
    }
  </div>
);

BasketItems.propTypes = {
  phonesToBasket: PropTypes.shape().isRequired,
  handleBasket: PropTypes.func.isRequired,
};

export default BasketItems;
