import { useAppSelector } from './typedHooks';

export const useFavourites = () => {
  const favouritesItems = useAppSelector(state => state.favourite.items);
  const favouritesCount = favouritesItems.length;

  return { favouritesItems, favouritesCount };
};
