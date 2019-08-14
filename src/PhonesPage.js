import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

const PhonesPage = ({ phone, urlImg, setItemToBasket }) => (
  <div
    key={phone.id}
    className="catalog__phones"
  >
    <div className="card" data-qa="card">
      <img
        src={
          `${urlImg}/${phone.imageUrl}`
        }
        alt="Motorrola"
        className="card__img"
      />
      <div className="card__text">{phone.name}</div>
      <div>
        <NavLink to={`/phones/${phone.id}`}>{ phone.id}</NavLink>
      </div>
      <div className="card__block-price">
        <div className="card__price">details:</div>
        <div className="card__price-number">{phone.snippet}</div>
      </div>
      <button
        type="submit"
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
