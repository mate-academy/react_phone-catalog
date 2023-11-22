import { Location } from 'react-router-dom';

export const isSearchVisible = (location: Location) => {
  const crumbs = location.pathname.split('/');

  const visiblePages = ['phones', 'tablets', 'accessories', 'favourites'];

  if (crumbs.length > 2) {
    return false;
  }

  return visiblePages.some(page => crumbs.includes(page));
};
