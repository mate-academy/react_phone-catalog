import React from 'react';
import PropTypes from 'prop-types';

const BasketItems = ({ phonesToBasket }) => (
  <div>
    {phonesToBasket.length === 0
      ? <h1>Basket is empty</h1>
      : phonesToBasket.map((phone, index) => (
        <div>
          <p>{index + 1}</p>
          <p>{phone.phone}</p>
          {phone.id}
        </div>
      ))}
  </div>
);

BasketItems.propTypes = {
  phonesToBasket: PropTypes.func.isRequired,
};

export default BasketItems;
