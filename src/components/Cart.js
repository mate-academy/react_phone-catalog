/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const Cart = ({
  orderedPhones,
  handleIncreasQuantity,
  handleDecreasQuantity,
  handleDeleteItem,
}) => (
  <div className="order-container">
    <div className="order-box">
      <h3>Your order:</h3>
      <ul className="order-list">
        {orderedPhones.map(phone => (
          <li key={phone.id}>
            <section className="order-content">
              <div className="order-control-block">
                <button type="button" className="btn btn-control">
                  <img
                    onClick={handleDecreasQuantity}
                    name={phone.name}
                    id={phone.id}
                    className="control-btn-icons"
                    src="/img/minus-icon.png"
                    alt="minus-button"
                  />
                </button>
                <button type="button" className="btn btn-control">
                  <img
                    onClick={handleIncreasQuantity}
                    name={phone.name}
                    id={phone.id}
                    className="control-btn-icons"
                    src="/img/add-icon.png"
                    alt="add-button"
                  />
                </button>
                <button type="button" className="btn btn-control">
                  <img
                    onClick={handleDeleteItem}
                    name={phone.name}
                    id={phone.id}
                    className="control-btn-icons"
                    src="/img/Delete.png"
                    alt="delete-button"
                  />
                </button>
              </div>
              <table className="order-item">
                <thead>
                  <tr>
                    <th>Phone:</th>
                    <th>Quantity:</th>
                    <th>Extra details link:</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{phone.name}</td>
                    <td>
                      <span className="order-quantity">{phone.quantity}</span>
                    </td>
                    <td>
                      <Link to={phone.link}>
                        <img
                          className="linked-order-photo"
                          src={phone.images[0]}
                          alt={phone.name}
                          title="see phone details again"
                        />
                      </Link>
                    </td>
                  </tr>
                </tbody>
              </table>
            </section>
          </li>
        ))}
      </ul>
    </div>
    <div className="order-btn-block">
      <div className="order-total">
        {orderedPhones.length > 1 ? (
          <>
            <span className="order-total-text">
              {`Total phones in cart: `}
            </span>
            {orderedPhones
              .map(phone => phone.quantity)
              .reduce((acc, val) => acc + val)}
          </>
        ) : (
          ''
        )}
      </div>
      <button type="button" className="btn btn-buy btn-pay">
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
    }).isRequired
  ).isRequired,
};

export default React.memo(Cart);
