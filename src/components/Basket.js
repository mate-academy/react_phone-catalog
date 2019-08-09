import React from 'react';
import { Link } from 'react-router-dom';

// eslint-disable-next-line
const Basket = ({ basketItems, onRemoveFormBasket, onChangeQuantity }) => (
  <div className="basket indent-mb-m">
    <h4>Basket:</h4>
    <ul>
      {basketItems.map(item => (
        <li key={item.id}>
          <div className="basket__item">
            <div className="basket__title indent-mb-s">
              <Link
                to={`/phones/${item.id}`}
              >
                {item.name}
              </Link>
            </div>
            <div className="basket__quantity">
              <div className="basket__button">
                <button
                  type="button"
                  name="decrease"
                  onClick={() => onChangeQuantity('decrease', item.id)}
                >
                    -
                </button>
              </div>
              <span>{item.quantity}</span>
              <div className="basket__button">
                <button
                  type="button"
                  name="increase"
                  onClick={() => onChangeQuantity('increase', item.id)}
                >
                    +
                </button>
              </div>
            </div>
            <div className="basket__button">
              <button
                type="button"
                name="remove"
                onClick={() => onRemoveFormBasket(item.id)}
              >
                x
              </button>
            </div>
          </div>
        </li>
      ))}
    </ul>
  </div>
);

export default Basket;
