import { Product } from '../../types/Product';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  addToFavorites, removeFromFavorites,
} from '../../features/favoritesSlice';

type Props = {
  wide?: boolean;
  product: Product;
};

export const AddToFavorite: React.FC<Props> = ({ wide, product }) => {
  const dispatch = useAppDispatch();

  const favorites = useAppSelector(state => state.favorites);

  const isFavorite = favorites.some(favorite => favorite.id === product.id);

  const toggleFavorite = (productItem: Product) => {
    if (isFavorite) {
      dispatch(removeFromFavorites(productItem));

      const updatedFavorites = favorites.filter(
        item => item.id !== productItem.id,
      );

      localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    } else {
      dispatch(addToFavorites(productItem));

      const updatedFavorites = [...favorites, productItem];

      localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    }
  };

  // eslint-disable-next-line no-console
  console.log(favorites);

  return (
    <button
      type="button"
      className={`addToFavorite ${wide ? 'addToFavorite-wide' : ''}`}
      onClick={(event) => {
        event.preventDefault();
        toggleFavorite(product);
      }}
    >
      <img
        className="addToFavorite__img"
        src={isFavorite
          ? 'new/img/icons/favorites-filled.svg'
          : 'new/img/icons/favorites.svg'}
        alt="favorites"
      />
    </button>
  );
};

// <img
//             src={location.pathname === '/favorites'
//               ? 'new/img/icons/favorites-filled.svg'
//               : 'new/img/icons/favorites.svg'}
//             alt="favorites"
//           />
