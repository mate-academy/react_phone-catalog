import './FavoriteButton.scss';
import { useContext } from 'react';
import FavoritesImg from '../../images/icons/Favourites (Heart Like).svg';
// import { Phones } from '../../types/Phones';
import FavoritesFilled
  from '../../images/icons/Favourites Filled (Heart Like).png';
import { FavoritesContext } from '../ContextProviders/ContextProviders';
import { Products } from '../../types/Products';

type FavoritesProducts = {
  cardData: Products,
  style?: {},
};

export const FavoriteButton: React.FC<FavoritesProducts> = ({
  cardData, style,
}) => {
  const {
    // id,
    // category,
    // phoneId,
    itemId,
    // name,
    // fullPrice,
    // price,
    // screen,
    // capacity,
    // color,
    // ram,
    // year,
    // image,
  } = cardData;

  const {
    favorites,
    addToFavorites,
    removeFromFavorites,
  } = useContext(FavoritesContext);

  const isFavorite = favorites.some(favorite => favorite.itemId === itemId);

  // const toggleFavorite = () => {
  //   if (isFavorite) {
  //     const updatedFavorites = favorites
  //       .filter(favorite => favorite.itemId !== itemId);

  //     setFavorites(updatedFavorites);
  //   } else {
  //     const updatedFavorites = [...favorites, cardData];

  //     setFavorites(updatedFavorites);
  //   }
  // };

  const toggleFavorite = () => {
    if (isFavorite) {
      removeFromFavorites(itemId);
    } else {
      addToFavorites(cardData);
    }
  };

  return (
    <button
      style={style}
      className="favoritesButton"
      type="button"
      onClick={toggleFavorite}
    >
      {isFavorite ? (
        <img
          src={FavoritesFilled}
          alt="Favorites"
          className="favoritesImage"
        />
      ) : (
        <img
          src={FavoritesImg}
          alt="Favorites"
          className="favoritesImage"
        />
      )}
    </button>
  );
};
