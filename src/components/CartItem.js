/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const CartItem = ({
  phone,
  handleIncreasQuantity,
  handleDecreasQuantity,
  handleDeleteItem,
}) => (
  <section className="order-content">
    <div className="order-control-block">
      <button type="button" className="btn btn-control">
        <img
          onClick={handleDecreasQuantity}
          name={phone.name}
          id={phone.id}
          className="control-btn-icons"
          src="./img/minus-icon.png"
          alt="minus-button"
        />
      </button>

      <button type="button" className="btn btn-control">
        <img
          onClick={handleIncreasQuantity}
          name={phone.name}
          id={phone.id}
          className="control-btn-icons"
          src="./img/add.png"
          alt="add-button"
        />
      </button>

      <button type="button" className="btn btn-control">
        <img
          onClick={handleDeleteItem}
          name={phone.name}
          id={phone.id}
          className="control-btn-icons"
          src="./img/Delete.png"
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
                src={phone.imageUrl}
                alt={phone.name}
                title="see phone details again"
              />
            </Link>
          </td>
        </tr>
      </tbody>
    </table>
  </section>
);

CartItem.propTypes = {
  handleIncreasQuantity: PropTypes.func.isRequired,
  handleDecreasQuantity: PropTypes.func.isRequired,
  handleDeleteItem: PropTypes.func.isRequired,
  phone: PropTypes.shape({
    name: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired,
    quantity: PropTypes.number.isRequired,
    id: PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isRequired,
  }).isRequired,
};

export default CartItem;
