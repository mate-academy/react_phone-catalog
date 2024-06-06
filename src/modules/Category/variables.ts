export const SORT_SELECT_DATA = {
  title: 'Alphabetically',
  age: 'Newest',
  price: 'Cheapest',
};
export const isSortSelectKey = (
  key: string,
): key is keyof typeof SORT_SELECT_DATA => {
  return key in SORT_SELECT_DATA;
};

export const SORT_SELECT_DEFAULT_KEY = 'age';

export const TAKE_SELECT_DATA = {
  '4': '4',
  '8': '8',
  '16': '16',
  all: 'all',
};

export const isTakeSelectKey = (
  key: string,
): key is keyof typeof TAKE_SELECT_DATA => {
  return key in TAKE_SELECT_DATA;
};

export const TAKE_SELECT_DEFAULT_KEY = '16';
