import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  increaseBasketItem,
  decreaseBasketItem,
  removeBasketItem,
} from '../../redux/actions';
import './Basket.css';

const Basket = ({
  phones,
  increaseItem,
  decreaseItem,
  removeItem,
}) => (
  <div className="basket">
    <h1 className="basket__title">Basket</h1>
    {Object.keys(phones).map(key => (
      <div
        key={key}
        className="basket__phone"
      >
        <div className="basket__phone-name">{key}</div>
        <button
          type="button"
          className="basket__phone-btn"
          onClick={() => increaseItem(key)}
        >
          +
        </button>
        <div className="basket__phone-count">{phones[key].count}</div>
        <button
          type="button"
          className="basket__phone-btn"
          onClick={() => decreaseItem(key)}
        >
          -
        </button>
        <button
          type="button"
          className="basket__phone-btn-delete"
          onClick={() => removeItem(key, phones[key].count)}
        >
          x
        </button>
      </div>
    ))}
  </div>
);

const mapStateToProps = state => ({
  phones: state.basketItems,
});

const mapDispatchToProps = dispatch => ({
  increaseItem: phoneId => dispatch(increaseBasketItem(phoneId)),
  decreaseItem: phoneId => dispatch(decreaseBasketItem(phoneId)),
  removeItem: (phoneId, count) => dispatch(removeBasketItem(phoneId, count)),
});

Basket.propTypes = {
  phones: PropTypes.arrayOf(PropTypes.object).isRequired,
  increaseItem: PropTypes.func.isRequired,
  decreaseItem: PropTypes.func.isRequired,
  removeItem: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Basket);
