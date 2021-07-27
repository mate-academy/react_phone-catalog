import {CartProduct} from './CartProduct'

import { connect } from "react-redux";
import { addCartProduct, deleteCartProduct, deleteOneCartProduct } from "../../redux/actions";

interface cart {
  id: number
}

interface State {
  cart: {
    cart: cart[]
  }
}

const mapDispatchToProps = {
  addCartProduct,
  deleteCartProduct,
  deleteOneCartProduct
};

export default connect((state: State) => ({
    cart: state.cart.cart
  }), mapDispatchToProps)(CartProduct)