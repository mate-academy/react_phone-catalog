import {ProductCard} from './ProductCard'

import { connect } from "react-redux";
import {
  addCartProduct,
  deleteCartProduct,
  addFavoriteProduct,
  deleteFavoriteProduct
} from "../../redux/actions";

import {Card} from '../../interfaces/Card'

interface State {
  cart: {
    cart: string[];
  };
  favorites: {
    favorites: Card[]
  }
}

const mapDispatchToProps = {
  addCartProduct,
  deleteCartProduct,
  addFavoriteProduct,
  deleteFavoriteProduct,
};

export default connect((state: State) => ({
    cart: state.cart.cart,
    favorites: state.favorites.favorites
  }), mapDispatchToProps)(ProductCard)
