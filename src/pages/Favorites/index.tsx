import {Favorites} from './Favorites'

import { connect } from "react-redux";

interface State {
  favorites: {
    favorites: string[]
  }
}

export default connect((state: State) => ({
    favorites: state.favorites.favorites
  }), null)(Favorites)