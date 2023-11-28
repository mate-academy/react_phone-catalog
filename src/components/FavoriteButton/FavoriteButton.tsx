import './FavoriteButton.scss';
import FavoritesImg from '../../images/icons/Favourites (Heart Like).svg';
import { Phones } from '../../types/Phones';
import FavoritesFilled
  from '../../images/icons/Favourites Filled (Heart Like).png';
import { useLocalStorage } from '../../hooks/useLocalStorage';

type FavoritesProducts = {
  cardData: Phones
};

export const FavoriteButton: React.FC<FavoritesProducts> = ({
  cardData,
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

  // const {
  //   favorites,
  //   handleAddToFavorites,
  //   handleRemoveFromFavorites,
  // } = useContext(FavoritesContext);

  // const favor = favorites
  //   .find((item: Phones) => item.id === itemId);

  // const [isFavorited, setIsFavorited] = useState(favor || false);

  // const newItem = {
  //   id,
  //   category,
  //   phoneId,
  //   itemId,
  //   name,
  //   fullPrice,
  //   price,
  //   screen,
  //   capacity,
  //   color,
  //   ram,
  //   year,
  //   image,
  // };

  // const handleFavorites = () => {
  //   if (isFavorited) {
  //     handleRemoveFromFavorites(itemId);
  //     setIsFavorited(false);
  //   } else {
  //     handleAddToFavorites(newItem);
  //     setIsFavorited(true);
  //   }
  // };

  // // useEffect(() => {
  // //   handleAddToFavorites(newItem);
  // // }, [isFavorited]);
  const [favorites, setFavorites] = useLocalStorage<Phones[]>('favorites', []);

  const isFavorite = favorites.some(favorite => favorite.itemId === itemId);

  const toggleFavorite = () => {
    if (isFavorite) {
      const updatedFavorites = favorites
        .filter(favorite => favorite.itemId !== itemId);

      setFavorites(updatedFavorites);
    } else {
      const updatedFavorites = [...favorites, cardData];

      setFavorites(updatedFavorites);
    }
  };

  return (
    <button
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
