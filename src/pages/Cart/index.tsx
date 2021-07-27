import {Cart} from './Cart'

import { connect } from "react-redux";

interface State {
  cart: {
    cart: string[]
  }
}

export default connect((state: State) => ({
    cart: state.cart.cart
  }), null)(Cart)