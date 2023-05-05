import { NavLink } from '../components/Nav';

export const navLinks: NavLink[] = [
  {
    path: '/',
    display: 'Home',
  },
  {
    path: '/phones',
    display: 'Phones',
  },
  {
    path: '/tablets',
    display: 'Tablets',
  },
  {
    path: '/accessories',
    display: 'Accessories',
  },
];

export const linksToHeader = ['phones', 'tablets', 'accessories', 'favourites'];

export const colors = ['#FCDBC1', '#5F7170', '#4C4C4C', '#F0F0F0'];

export const capacities = ['64 GB', '256 GB', '512 GB'];

export const onBackClicked = () => {
  window.history.back();
};

export const scrollTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
};

export const emptyCategoryErrorMessage
  = 'The are no available products in this category now. '
  + 'Please, check it later.';

export const notFoundPageErrorMessage = 'Page was not found';

export const somethingWentWrongErrorMessage = 'Something went wrong';
