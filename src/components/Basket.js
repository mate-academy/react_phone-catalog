import React from 'react';
import { Link } from 'react-router-dom';

const Basket = ({
  basketItems,
  changeQuantityPlus,
  removeBasketItems,
  changeQuantityMinus }) => (
    (basketItems.length > 0)
      ? (<div>
        <table className="basket-table">
          <tr>
            <td colspan="4" className="basket-caption">
              Your order:
              </td>
          </tr>
          <tr>
            <th className="basket-th">#</th>
            <th className="basket-th">Name of the position </th>
            <th className="basket-th">Quantity</th>
            <th className="basket-th"></th>
          </tr>
          {basketItems.map((basketItem, i) =>
            <tr>
              <td className="basket-td">
                {i + 1}
              </td>
              <td className="basket-td">
                <Link
                  className="phones-title"
                  to={`/phones/${basketItem.id}`}
                >
                  {basketItem.phoneName}
                </Link>
              </td>
              <td className="basket-td">
                <div class="input-group minus basket-btn-section">
                  <span class="input-group-btn">
                    <Link
                      onClick={() => changeQuantityMinus(basketItem.id)}
                      className="btn btn-danger btn-number"
                    >
                      <span class="glyphicon glyphicon-minus">-</span>
                    </Link>
                  </span>
                  <input
                    type="text"
                    name="count"
                    class="form-control input-number number"
                    value={basketItem.quantity}
                  />
                  <span class="input-group-btn plus">
                    <Link
                      onClick={() => changeQuantityPlus(basketItem.id)}
                      className="btn btn-success btn-number"
                    >
                      <span class="glyphicon glyphicon-plus">+</span>
                    </Link>
                  </span>
                </div>
              </td>
              <td>
                <Link
                  onClick={() => removeBasketItems(basketItem.id)}
                  className="basket-delete"
                >
                  x
                  </Link>
              </td>
            </tr>
          )}
        </table>
        <Link
          className="basket-buy-button"
          to={`/сheckout/`}
        >
          Checkout
        </Link>
      </div>) : (
        <h1 className="basket-header">The basket is empty</h1>
      )
  )

export default Basket;
