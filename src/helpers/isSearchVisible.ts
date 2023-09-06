import { Location } from 'react-router-dom';

const ACTIVE_PAGES = ['phones', 'tablets', 'accessories', 'favourites'];

export const isSearchVisible = (location: Location) => {
  const locationSplited = location.pathname.split('/');

  if (locationSplited.length > 2) {
    return false;
  }

  return ACTIVE_PAGES.some(currentPage => {
    return locationSplited.includes(currentPage);
  });
};
