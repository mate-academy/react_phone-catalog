import { useAppSelector } from './typedHooks';

export const useFavourites = () => {
  const favouritesItems = useAppSelector(state => state.favourite.items);
  const hasFavouritesProduct = favouritesItems.length;

  return { favouritesItems, hasFavouritesProduct };
};
