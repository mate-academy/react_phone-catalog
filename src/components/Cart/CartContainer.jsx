import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Cart } from './Cart';
import {
  removeFromCartAC,
  addQantityAC,
  substractQuantityAC,
} from '../../redux/reducers/actionCreators';
import { addedPhonesPropType } from '../../propTypesConstants';

const CartContainer = (props) => {
  const {
    addedPhones,
    totalPrice,
    removePhone,
    totalCount,
    addQuantity,
    substractQuantity,
  } = props;

  return (
    <Cart
      addedPhones={addedPhones}
      removePhone={removePhone}
      totalPrice={totalPrice}
      totalCount={totalCount}
      addQuantity={addQuantity}
      substractQuantity={substractQuantity}
    />
  );
};

const mapStateToProps = (state) => ({
  addedPhones: state.phonesPage.addedPhones,
  totalPrice: state.phonesPage.totalPrice,
  totalCount: state.phonesPage.totalCount,
});

const mapDispatchToProps = (dispatch) => ({
  removePhone: (id) => dispatch(removeFromCartAC(id)),
  addQuantity: (id) => dispatch(addQantityAC(id)),
  substractQuantity: (id) => dispatch(substractQuantityAC(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CartContainer);

CartContainer.propTypes = {
  totalPrice: PropTypes.number.isRequired,
  removePhone: PropTypes.func.isRequired,
  totalCount: PropTypes.number.isRequired,
  addQuantity: PropTypes.func.isRequired,
  substractQuantity: PropTypes.func.isRequired,
  addedPhones: addedPhonesPropType.isRequired,
};
