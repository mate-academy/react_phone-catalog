import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import './PhoneCatalog.css';
import { addToBasket } from '../../redux/actions';
import Filter from '../Filter/Filter';

const PhoneCatalog = ({ phones, addPhoneToBasket }) => (
  <>
    <Filter />
    <div className="phones">
      <h1 className="phones__title">Phone Catalog</h1>
      {phones.map(phone => (
        <div className="phone" key={phone.id}>
          <NavLink to={`/phones/${phone.id}`}>
            <div className="phone__img">
              <img
                src={
                  // eslint-disable-next-line max-len
                  `https://mate-academy.github.io/phone-catalogue-static/${phone.imageUrl}`
                }
                alt={phone.name}
                width="100%"
              />
            </div>
          </NavLink>
          <NavLink to={`/phones/${phone.id}`}>
            <div className="phone__name">
              {phone.name}
            </div>
          </NavLink>
          <button
            type="button"
            className="phone__btn"
            onClick={() => addPhoneToBasket(phone.name)}
          >
            Add to basket
          </button>
        </div>
      ))}
    </div>
  </>
);

const mapStateToProps = state => ({
  phones: state.shownPhones,
});

const mapDispatchToState = dispatch => ({
  addPhoneToBasket: phoneName => dispatch(addToBasket(phoneName)),
});

PhoneCatalog.propTypes = {
  phones: PropTypes.arrayOf(PropTypes.object).isRequired,
  addPhoneToBasket: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToState)(PhoneCatalog);
