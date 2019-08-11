import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import CartItem from './CartItem';

const Cart = ({
  orderedPhones,
  handleIncreasQuantity,
  handleDecreasQuantity,
  handleDeleteItem,
}) => (
  <div className="order-container">
    <div className="order-box">
      <h3>Your order:</h3>
      <div
        className={orderedPhones.length ? 'cart-empty hidden' : 'cart-empty'}
      >
        <span>
          {`You haven’t chosen anything yet. But it's not too late to fix :)`}
        </span>
        <Link className="cart-empty-link" to="/phones">
          Open catalog
        </Link>
      </div>
      <ul className="order-list">
        {orderedPhones.map(phone => (
          <li key={phone.id}>
            <CartItem
              phone={phone}
              orderedPhones={orderedPhones}
              handleIncreasQuantity={handleIncreasQuantity}
              handleDecreasQuantity={handleDecreasQuantity}
              handleDeleteItem={handleDeleteItem}
            />
          </li>
        ))}
      </ul>
      <section className="order-content">
        <Link to="/phones">
          <button
            type="button"
            className={
              !orderedPhones.length
                ? 'btn btn-buy btn-add-more hidden'
                : 'btn btn-buy btn-add-more'
            }
          >
            + Add more phones +
          </button>
        </Link>
      </section>
    </div>

    <div className="order-btn-block">
      <div className="order-total">
        {orderedPhones.length > 1 && (
          <>
            <span className="order-total-text">Total phones in cart: </span>
            {orderedPhones
              .map(phone => phone.quantity)
              .reduce((acc, val) => acc + val)}
          </>
        )}
      </div>
      <button
        type="button"
        className={
          orderedPhones.length < 1
            ? 'btn btn-buy btn-pay hidden'
            : 'btn btn-buy btn-pay'
        }
      >
        {'->> TO PAY <<-'}
      </button>
    </div>
  </div>
);

Cart.propTypes = {
  handleIncreasQuantity: PropTypes.func.isRequired,
  handleDecreasQuantity: PropTypes.func.isRequired,
  handleDeleteItem: PropTypes.func.isRequired,
  orderedPhones: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      link: PropTypes.string.isRequired,
      quantity: PropTypes.number.isRequired,
      id: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
};

export default Cart;
