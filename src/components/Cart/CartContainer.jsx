import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Cart } from './Cart';

const CartContainer = (props) => {
  const { addedPhones } = props;

  return (
    <Cart
      addedPhones={addedPhones}
    />
  );
};

const mapStateToProps = (state) => ({
  addedPhones: state.cartPage.addedPhones,
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
};
