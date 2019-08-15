import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

const PhonesPage = ({ phone, urlImg, setItemToBasket }) => (
  <div
    key={phone.id}
    className="price-tags"
  >
    <div className="price-tag" data-qa="card">
      <NavLink
        to={`/phones/${phone.id}`}
        className="price-tag__wrapp-card"
      >
        <img
          className="price-tag__wrapp-card-img"
          src={
            `${urlImg}/${phone.imageUrl}`
          }
          alt="Phone"
        />
      </NavLink>
      <span className="card__span">
        <NavLink to={`/phones/${phone.id}`}>{ phone.id}</NavLink>
      </span>
      <h4 className="card__h4">details:</h4>
      <p className="card__information__detail">{phone.snippet}</p>
      <button
        type="submit"
        className="price-btn"
        onClick={() => {
          setItemToBasket(phone.name, urlImg, phone.id);
        }}
      >
              Add
      </button>
    </div>
  </div>
);

PhonesPage.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  phone: PropTypes.object.isRequired,
  urlImg: PropTypes.string.isRequired,
  setItemToBasket: PropTypes.isRequired,
};

export default PhonesPage;
