import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

const PhonesPage = ({ phone, IMAGE_URL, setItemToBasket }) => (
  <div
    key={phone.id}
    className="price-tags"
  >
    <div className="price-tag">
      <NavLink
        to={`/phones/${phone.id}`}
        className="price-tag__wrapp-card"
      >
        <img
          className="price-tag__wrapp-card-img"
          src={
            `${IMAGE_URL}/${phone.imageUrl}`
          }
          alt="Phone"
        />
      </NavLink>
      <span className="card__item-title">
        <NavLink
          to={`/phones/${phone.id}`}
          className="card__item-title"
        >
          { phone.id}
        </NavLink>
      </span>
      <div className="about__item-text">
        {phone.snippet}
      </div>
      <div className="card__information__detail">
        <button
          type="submit"
          className="price-btn default__btn"
          onClick={() => {
            setItemToBasket(phone.name, phone.id);
          }}
        >
        Add
        </button>
      </div>
    </div>
  </div>
);

PhonesPage.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  phone: PropTypes.object.isRequired,
  IMAGE_URL: PropTypes.string.isRequired,
  setItemToBasket: PropTypes.isRequired,
};

export default PhonesPage;
