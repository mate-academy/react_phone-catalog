import { Location } from 'react-router-dom';

export const SearchIsActive = (location: Location) => {
  const crumbs = location.pathname.split('/');

  const activePages = ['phones', 'tablets', 'accessories', 'favourites'];

  if (crumbs.length > 2) {
    return false;
  }

  return activePages.some(page => {
    return crumbs.includes(page);
  });
};
