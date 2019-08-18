import React from 'react';
import PropTypes from 'prop-types';

const BasketItems = ({ phonesToBasket, handleBasket }) => (
  <div className="basket__wrapper__main">
    {phonesToBasket.length === 0
      ? <h1 className="basket__empty">Basket is empty</h1>
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
                  <td>
                    <button
                      type="button"
                      onClick={() => handleBasket(phone.id, 'remove')}
                      className="basketPage__table-quantity-remove"
                    >
                 x
                    </button>
                  </td>
                  <td className="basketPage__table-tbody-td">
                    <button
                      type="button"
                      onClick={() => handleBasket(phone.id, 'decrease')}
                      className="basketPage__table-quantity-minus"
                    >
                 -
                    </button>
                    {phone.quantity}
                    <button
                      type="button"
                      onClick={() => handleBasket(phone.id, 'increase')}
                      className="basketPage__table-quantity-plus"
                    >
                 +
                    </button>
                  </td>
                </tr>
              ))

            }
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
