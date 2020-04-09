import React from 'react';
import './ProductCard.scss';
import PropTypes from 'prop-types';

export const ProductCard = (props) => {
  const { imageUrl, name } = props;

  return (
    <div className="card">

      <img
        src={imageUrl}
        alt="/"
        className="catalog__product-img"
      />
      <p>{name}</p>
    </div>
  );
};

ProductCard.propTypes = {
  imageUrl: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};
