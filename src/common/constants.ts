import { SORT } from './enums.d';

export const DIRECTIONS = {
  left: 'left',
  right: 'right',
};

export const DROPDOWN_HEADINGS = {
  perPage: 'Items on page',
  sortBy: 'Sort by',
};

export const SORT_TYPES = [
  { option: SORT.NEWEST },
  { option: SORT.FROM_A_TO_Z },
  { option: SORT.FROM_Z_TO_A },
  { option: SORT.CHEAPEST },
];

export const PER_PAGE = [
  { option: '4' },
  { option: '8' },
  { option: '16' },
  { option: 'All' },
];

export const PRODUCT_TYPES: ProductTypes = {
  phone: 'phones',
  tablet: 'tablets',
};
