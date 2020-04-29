import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Cart } from './Cart';

const CartContainer = (props) => {
  const { addedPhones, total } = props;

  return (
    <Cart
      addedPhones={addedPhones}
      total={total}
    />
  );
};

const mapStateToProps = (state) => ({
  addedPhones: state.phonesPage.addedPhones,
  total: state.phonesPage.total,
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
  total: PropTypes.number.isRequired,
};
