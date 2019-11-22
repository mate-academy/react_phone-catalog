import React from 'react';
import { Link } from 'react-router-dom';

const BasketPage = ({ itemsAtBasket, basketManager }) => (
  <div className="basketPage">
    {
      itemsAtBasket.length
        ? (
          <table className="basketPage__table">
            <thead className="basketPage__table-thead">
              <tr>
                <td className="basketPage__table-thead-td">
                    Наименование товара
                </td>
                <td />
                <td className="basketPage__table-thead-td">Количество</td>
              </tr>
            </thead>
            <tbody>
              {
                itemsAtBasket.map(item => (
                  <tr 
                    key={`tr + ${item.id}`} 
                    className="basketPage__table-tbody-tr"
                    >
                    <td className="basketPage__table-tbody-td">
                      <Link
                        className="basketPage__table-tbody-td-link"
                        to={`/phones/${item.id}`}
                      >
                        {item.name}
                      </Link>
                    </td>
                    <td>
                      <button
                        onClick={() => basketManager(item.id, 'remove')}
                        className="basketPage__table-quantity-remove"
                      >
                        x
                      </button>
                    </td>
                    <td className="basketPage__table-tbody-td">
                      <button
                        onClick={() => basketManager(item.id, 'decrease')}
                        className="basketPage__table-quantity-minus"
                      >
                        -
                      </button>
                      {item.quantity}
                      <button
                        onClick={() => basketManager(item.id, 'increase')}
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
        : <div>Empty</div>
    }
  </div>
);

export default BasketPage;
