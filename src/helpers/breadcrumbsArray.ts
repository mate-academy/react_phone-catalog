import { Location } from 'history';

export const breadcrumbsArray = (location: Location) => (
  location.pathname.split('/')
    .filter((e) => e !== '%' && e !== '#' && e)
    .map((e) => e.charAt(0).toUpperCase() + e.slice(1))
);
