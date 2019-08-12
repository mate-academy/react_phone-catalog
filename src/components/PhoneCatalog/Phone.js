import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import './Phone.css';

const Phone = ({ phones }) => {
  const listOfPhones = phones.map(phone => (
    <div className="phone-catalogue__phone" key={phone.age}>
      <div className="phone-catalogue__phone--img">
        <img src={`./${phone.imageUrl}`} alt={phone.id} />
        <NavLink
          className="phone-catalogue__phone--link"
          to="/"
        >
          {phone.name}
        </NavLink>
        <p
          className="phone-catalogue__phone--snippet"
        >
          {phone.snippet}
        </p>
        <button
          type="submit"
          className="phone-catalogue__phone--buy"
        >
          buy
        </button>
      </div>
    </div>
  ));

  return listOfPhones;
};

Phone.propTypes = {
  phones: PropTypes.shape({
    age: PropTypes.number.isRequired,
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isRequired,
    snippet: PropTypes.string.isRequired,
  }).isRequired,
};

export default Phone;
