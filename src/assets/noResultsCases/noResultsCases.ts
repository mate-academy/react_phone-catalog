import { NoResultsCase, NoResultsCaseName } from '../../types/NoResultsCase';

export const noResultsCases: NoResultsCase[] = [
  {
    name: NoResultsCaseName.ProductDoesntExist,
    image: './img/no_results/NotExist.png',
    warningText: 'was not found or is not listed in our catalog.',
    suggestionText: 'Please check the entered product name.',
  },
  {
    name: NoResultsCaseName.EmptyCategory,
    image: './img/no_results/EmptyCategory.png',
    warningText: 'category is empty at this time, '
      + 'but we are doing our best to change it.',
    suggestionText: 'Please try our other categories or come back again later.',
  },
  {
    name: NoResultsCaseName.EmptyCart,
    image: './img/no_results/EmptyCart.png',
    warningText: 'your cart is empty at this time, '
      + 'but we hope it won\'t last for long...',
    suggestionText:
      'Сome back again later when you have made your decision to purchase.',
  },
  {
    name: NoResultsCaseName.EmptyFavourites,
    image: './img/no_results/NoFavourites.png',
    warningText: 'You still have no favourite gadgets...',
    suggestionText: 'Have you seen our new phones? '
      + 'You\'ll definitely love them.',
  },
  {
    name: NoResultsCaseName.PageNotFound,
    image: './img/no_results/PageNotFound.png',
    warningText: 'the page you are looking for does\'nt exist anymore '
      + 'or might never existed.',
    suggestionText: 'But that\'s totally ok! '
      + 'Just click the button below and start from the home page.',
  },
];

export const defaultCase: NoResultsCase = {
  name: NoResultsCaseName.Default,
  image: './img/no_results/NotExist.png',
  warningText: 'no results at this time.',
  suggestionText: 'Come again later.',
};
