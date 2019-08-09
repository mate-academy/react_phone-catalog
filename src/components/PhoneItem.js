import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const PhoneItem = ({ phones, handleAddToCart }) => (
  <ul className="phones-list">
    {phones.map(phone => (
      <li key={phone.id} className="phones-item">
        <section className="phones-item-info">
          <Link to={`/phones/${phone.id}`}>
            <img
              className="phones-main-photo"
              src={phone.imageUrl}
              alt={phone.name}
            />
          </Link>

          <div className="phones-item-text">
            <h3>
              <Link
                className="phones-item-title"
                to={`/phones/${phone.id}`}
              >
                {phone.name}
              </Link>
            </h3>
            <p>{phone.snippet}</p>
          </div>
          <div className="phones-item-add-btn">
            <button
              onClick={handleAddToCart}
              id={phone.id}
              className="add-btn"
              type="button"
            >
              {'ADD TO CART'}
            </button>
          </div>
        </section>
      </li>
    ))}
  </ul>
);

PhoneItem.propTypes = {
  phones: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      snippet: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
      imageUrl: PropTypes.string.isRequired,
    })
  ).isRequired,
  handleAddToCart: PropTypes.func.isRequired,
};

export default PhoneItem;
