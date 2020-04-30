import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Cart } from './Cart';

const CartContainer = (props) => {
  const { addedPhones, totalPrice, itemPrice } = props;

  return (
    <Cart
      addedPhones={addedPhones}
      totalPrice={totalPrice}
      itemPrice={itemPrice}
    />
  );
};

const mapStateToProps = (state) => ({
  addedPhones: state.phonesPage.addedPhones,
  totalPrice: state.phonesPage.totalPrice,
  itemPrice: state.phonesPage.itemPrice,
});

export default connect(mapStateToProps)(CartContainer);

CartContainer.propTypes = {
  addedPhones: PropTypes.arrayOf(
    PropTypes.shape({
      age: PropTypes.number,
      id: PropTypes.string,
      imageUrl: PropTypes.string,
      name: PropTypes.string,
      snippet: PropTypes.string,
    }).isRequired,
  ).isRequired,
  totalPrice: PropTypes.number.isRequired,
  itemPrice: PropTypes.number.isRequired,
};
