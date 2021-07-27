import { LikeButton } from './LikeButton'

import { connect } from "react-redux";
import {
  addFavoriteProduct,
  deleteFavoriteProduct,
} from "../../redux/actions";

interface State {
  favorites: {
    favorites: string[];
  };
}

const mapDispatchToProps = {
  addFavoriteProduct,
  deleteFavoriteProduct,
};

export default connect((state: State) => ({
    favorites: state.favorites.favorites,
  }), mapDispatchToProps)(LikeButton)
