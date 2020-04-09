import React from 'react';
import './ProductCard.scss';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

export const ProductCard = (props) => {
  const { imageUrl, name } = props;

  return (
    <div className="card">

      <img
        src={imageUrl}
        alt="/"
        className="catalog__product-img"
      />
      <NavLink to="/phones/:phoneId">{name}</NavLink>
    </div>
  );
};

ProductCard.propTypes = {
  imageUrl: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};
