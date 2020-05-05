import React from 'react';
import './PhonesCatalog.scss';
import PropTypes from 'prop-types';
import { ProductCard } from './ProductCard/ProductCard';

export const PhonesCatalog = (props) => {
  const { phones, addToCart, addToFavorites } = props;

  return (
    <>
      <div className="catalog">
        <ul className="catalog__product-list">

          {phones.map(phone => (
            <li key={phone.age} className="catalog__product-item">
              <ProductCard
                {...phone}
                addToCart={addToCart}
                addToFavorites={addToFavorites}
              />
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

PhonesCatalog.propTypes = {
  phones: PropTypes.arrayOf(
    PropTypes.shape({
      age: PropTypes.number,
      id: PropTypes.string,
      imageUrl: PropTypes.string,
      name: PropTypes.string,
      snippet: PropTypes.string,
    }).isRequired,
  ).isRequired,
  addToCart: PropTypes.func.isRequired,
};
