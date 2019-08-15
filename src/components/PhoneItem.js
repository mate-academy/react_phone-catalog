import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const PhoneItem = ({ phone, handleAddToCart }) => {
  const {
    name,
    snippet,
    id,
    imageUrl,
  } = phone;

  return (
    <section className="phones-item-info">
      <Link to={`/phones/${id}`}>
        <img
          className="phones-main-photo"
          src={imageUrl}
          alt={name}
        />
      </Link>

      <div className="phones-item-text">
        <h3>
          <Link
            className="phones-item-title"
            to={`/phones/${id}`}
          >
            {name}
          </Link>
        </h3>
        <p>{snippet}</p>
      </div>
      <div className="phones-item-add-btn">
        <button
          onClick={handleAddToCart}
          id={id}
          className="add-btn"
          type="button"
        >
          {'ADD TO CART'}
        </button>
      </div>
    </section>
  );
};

PhoneItem.propTypes = {
  phone: PropTypes.shape({
    name: PropTypes.string.isRequired,
    snippet: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isRequired,
  }).isRequired,

  handleAddToCart: PropTypes.func.isRequired,
};

export default PhoneItem;
