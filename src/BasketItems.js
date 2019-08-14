import React from 'react';
import PropTypes from 'prop-types';

const BasketItems = ({ phonesToBasket, handleBasket }) => (
  <div>
    {phonesToBasket.length === 0
      ? <h1>Basket is empty</h1>
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
                      onClick={() => handleBasket(index, 'remove')}
                      className="basketPage__table-quantity-remove"
                    >
                 x
                    </button>
                  </td>
                  <td className="basketPage__table-tbody-td">
                    <button
                      type="button"
                      onClick={() => handleBasket(index, 'decrease')}
                      className="basketPage__table-quantity-minus"
                    >
                 -
                    </button>
                    {phone.quantity}
                    <button
                      type="button"
                      onClick={() => handleBasket(index, 'increase')}
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
