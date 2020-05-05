import React from 'react';
import { connect } from 'react-redux';
import { Favorites } from './Favorites';
import {
  addToFavoritesAC,
  addToCartAC,
} from '../../redux/reducers/actionCreators';

const CartContainer = (props) => {
  const {
    favoritePhones,
    addToFavorites,
    addToCart,
  } = props;

  return (
    <Favorites
      favoritePhones={favoritePhones}
      addToFavorites={addToFavorites}
      addToCart={addToCart}
    />

  );
};

const mapStateToProps = (state) => ({
  favoritePhones: state.phonesPage.favoritePhones,
});

const mapDispatchToProps = (dispatch) => ({
  addToFavorites: (id) => dispatch(addToFavoritesAC(id)),
  addToCart: (id) => dispatch(addToCartAC(id)),

});

export default connect(mapStateToProps, mapDispatchToProps)(CartContainer);
