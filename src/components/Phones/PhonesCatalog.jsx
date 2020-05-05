import React from 'react';
import './PhonesCatalog.scss';
import PropTypes from 'prop-types';
import { ProductCard } from './ProductCard/ProductCard';
import { phonesPropType } from '../../propTypesConstants';

export const PhonesCatalog = (props) => {
  const { phones, addToCart, addToFavorites, itemPrice } = props;

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
                itemPrice={itemPrice}
              />
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

PhonesCatalog.propTypes = {
  phones: phonesPropType.isRequired,
  addToCart: PropTypes.func.isRequired,
  addToFavorites: PropTypes.func.isRequired,
  itemPrice: PropTypes.number.isRequired,
};
