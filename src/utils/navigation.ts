import { To, Location } from 'react-router-dom';

export const getPathFromTo = (to: To): string => {
  if (typeof to === 'string') {
    return to;
  }

  return `${to.pathname ?? ''}${to.search ?? ''}${to.hash ?? ''}`;
};

export const getPathFromLocation = (location: Location): string => {
  return `${location.pathname}${location.search}${location.hash}`;
};

export const shouldNavigate = (to: To, location: Location): boolean => {
  return getPathFromTo(to) !== getPathFromLocation(location);
};
