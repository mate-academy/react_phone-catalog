import React from 'react';
import propTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './styles/basket.css';

const Basket = ({ basketItems, handlerRemovePhone, handlerChangeAmount }) => (
  <div className="basket">
    <h2>Your order</h2>
    {(basketItems.length > 0) ? (
      basketItems.map(item => (
        <div className="basket-item">
          <div className="basket-item__info">
            <Link
              className="basket-item__info--image-link"
              to={`/phone-catalog/${item.id}`
              }
            >
              <img src={item.imageUrl} alt="order" />
            </Link>
            <Link
              className="basket-item__info--title-link"
              to={`/phone-catalog/${item.id}`}
            >
              <h3>{item.name}</h3>
            </Link>
          </div>
          <div className="basket-buttons">
            <button
              onClick={() => handlerChangeAmount(item.id, 'plus')}
              disabled={item.amount === 100}
              type="button"
              className={(item.amount === 100)
                ? 'basket-buttons__item basket-buttons__item--disabled'
                : 'basket-buttons__item'}
            >
              +
            </button>
            <span>{item.amount}</span>
            <button
              onClick={() => handlerChangeAmount(item.id, 'minus')}
              disabled={item.amount === 1}
              type="button"
              className={(item.amount === 1)
                ? 'basket-buttons__item basket-buttons__item--disabled'
                : 'basket-buttons__item'}
            >
              -
            </button>
            <button
              type="button"
              className="basket-buttons__item basket-buttons--delete"
              onClick={() => handlerRemovePhone(item.id)}
            >
              X
            </button>

          </div>

        </div>
      ))
    ) : (
      <h2 className="basket-empty">Basket is empty</h2>
    )
    }
  </div>
);

Basket.propTypes = {
  basketItems: propTypes.arrayOf().isRequired,
  handlerRemovePhone: propTypes.func.isRequired,
  handlerChangeAmount: propTypes.func.isRequired,
};

export default Basket;
