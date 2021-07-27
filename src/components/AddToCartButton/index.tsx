import {AddToCartButton} from './AddToCartButton'

import { connect } from "react-redux";
import {
  addCartProduct,
  deleteCartProduct,
  
} from "../../redux/actions";
import { order } from '../../interfaces/Order';

interface State {
  cart: {
    cart: order[];
  };
}

const mapDispatchToProps = {
  addCartProduct,
  deleteCartProduct,
};

export default connect((state: State) => ({
    cart: state.cart.cart,
  }), mapDispatchToProps)(AddToCartButton)
