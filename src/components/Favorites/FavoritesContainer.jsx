import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Favorites } from './Favorites';
import {
  addToFavoritesAC,
  addToCartAC,
} from '../../redux/reducers/actionCreators';
import { favoritePhonesPropType } from '../../propTypesConstants';

const FavoritesContainer = (props) => {
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

export default connect(mapStateToProps, mapDispatchToProps)(FavoritesContainer);

FavoritesContainer.propTypes = {
  favoritePhones: favoritePhonesPropType.isRequired,
  addToCart: PropTypes.func.isRequired,
  addToFavorites: PropTypes.func.isRequired,
};
