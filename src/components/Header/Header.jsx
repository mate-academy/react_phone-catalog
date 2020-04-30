import React from 'react';
import './Header.scss';
import './Navigation.scss';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import favoriteIcon from '../../assets/images/icons/favorite-icon.svg';
import basketIcon from '../../assets/images/icons/basket-icon.svg';

const Header = (props) => (
  <header className="header">
    <div className="header__header-wrapper">
      <nav className="header__nav nav">
        <a
          className="header__logo"
          href="https://www.youtube.com/watch?v=fHiGbolFFGw"
          target="_blank"
          rel="noopener noreferrer"
        >
          <p className="header__logo-heading">Android</p>
          <p className="header__logo-underheading">paranoid</p>
        </a>
        <ul className="nav__list">
          <li className="nav__item">
            <NavLink
              className="nav__link"
              to="/"
              exact
            >
              Home
            </NavLink>
          </li>
          <li className="nav__item">
            <NavLink
              className="nav__link"
              to="/phones"
            >
              Phones
            </NavLink>
          </li>
        </ul>
      </nav>
      <div className="header__menu">
        <button className="header__favorite" type="button">
          <img
            src={favoriteIcon}
            alt="favorite icon"
            className="header__favorite-icon"
          />
          {' '}
        </button>
        <NavLink to="/basket">
          <button className="header__basket" type="button">
            <img
              src={basketIcon}
              alt="basket icon"
              className="header__basket-icon"
            />
            {props.addedPhones.length
              ? (
                <div className="header__basket-count">
                  {props.addedPhones.length}
                </div>
              )
              : null}
          </button>
        </NavLink>
      </div>
    </div>
  </header>
);

const mapStateToProps = (state) => ({
  addedPhones: state.phonesPage.addedPhones,
});

export default connect(mapStateToProps)(Header);

Header.propTypes = {
  addedPhones: PropTypes.arrayOf.isRequired,
};
