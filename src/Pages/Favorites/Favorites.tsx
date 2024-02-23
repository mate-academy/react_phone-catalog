import { useSelector } from 'react-redux';
import { FavoritesView } from './FavoritesView';
import { selectFavorites } from '../../store/selectors/favoritesSlice';

export const Favorites = () => {
  const { favorites } = useSelector(selectFavorites);

  const productsToRender = favorites || [];

  return (
    <FavoritesView favorites={productsToRender} />
  );
};
