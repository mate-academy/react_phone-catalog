import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const PhoneCatalog = ({ phones, addPhone }) => (
  <div className="phones-catalog">
    <h1>Phones</h1>

    {phones.map(phone => (
      <article
        key={phone.id}
        className="phone-card"
      >
        <Link to={`/phones/${phone.id}`}>
          <img
            src={phone.imageUrl}
            alt="phone"
            className="phone-card__img"
          />
        </Link>

        <Link to={`/phones/${phone.id}`}>
          {phone.name}
        </Link>

        <p>{phone.snippet}</p>

        <button
          type="button"
          className="cart-btn"
          onClick={() => addPhone(phone)}
        >
          Add to basket
        </button>
      </article>
    ))}
  </div>
);

PhoneCatalog.propTypes = {
  phones: PropTypes.arrayOf(PropTypes.object).isRequired,
  addPhone: PropTypes.func.isRequired,
};

export default PhoneCatalog;
