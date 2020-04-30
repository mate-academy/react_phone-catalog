import React from 'react';
import './Phones.scss';
import { NavLink } from 'react-router-dom';
import { phonesPropType } from '../../propTypesConstants';
import backArrow from '../../assets/images/icons/back-arrow.svg';
import homeIcon from '../../assets/images/icons/home-icon.svg';

export const Phones = (props) => {
  const { phones } = props;

  return (
    <div className="content-heading">
      <div className="phone__navigation">
        <NavLink to="/" className="phone__back-link">
          <img
            src={homeIcon}
            alt="back arrow navigation"
            className="phone__back-arrow"
          />
          <img
            src={backArrow}
            alt="back arrow navigation"
            className="phone__back-arrow"
          />
          <span className="phone__back-link">Home</span>
        </NavLink>
      </div>
      <h1 className="content-heading__title">Phone Catalog</h1>
      <p className="content-heading__count">{`${phones.length} models`}</p>
    </div>
  );
};

Phones.propTypes = {
  phones: phonesPropType.isRequired,
};
