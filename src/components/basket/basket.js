import React from 'react';
import { Link } from 'react-router-dom';
import {
  CSSTransition,
  TransitionGroup,
} from 'react-transition-group';
import PropTypes from 'prop-types';

import './styles.css';

const Basket = ({ basketItems, onRemoveFormBasket, onChangeQuantity }) => (
  <TransitionGroup component="ul">
    {basketItems.map(item => (
      <CSSTransition
        key={item.id}
        timeout={500}
        classNames="fade"
        appear
      >
        <li>
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
                  onClick={
                    () => onChangeQuantity('decrease', item.id)
                  }
                >
                  -
                </button>
              </div>
              <span className="quantity">{item.quantity}</span>
              <div className="basket__button">
                <button
                  type="button"
                  name="increase"
                  onClick={
                    () => onChangeQuantity('increase', item.id)
                  }
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
      </CSSTransition>
    ))}
  </TransitionGroup>
);

Basket.propTypes = {
  basketItems: PropTypes.instanceOf(Array).isRequired,
  onRemoveFormBasket: PropTypes.func.isRequired,
  onChangeQuantity: PropTypes.func.isRequired,
};

export default Basket;
