import { useAppState } from '../store/Store';

export const useFavorites = () => {
  const { favorites } = useAppState();

  const totalCount = favorites.length;

  return { favorites, totalCount };
};
