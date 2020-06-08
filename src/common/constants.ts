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

export const PRODUCT_PATHS: ProductPaths = {
  phone: 'phones',
  tablet: 'tablets',
  favorites: 'favorites',
};

export const PRODUCT_TYPES = {
  phone: 'phone',
  tablet: 'tablet',
};

export const LOCATIONS = {
  phones: '/phones',
  tablets: '/tablets',
  favorites: '/favorites',
  cart: '/cart',
};

export const SHOWCASE_HEADINGS = {
  hotPrices: 'Hot prices',
  newModels: 'Brand new models',
  alsoLike: 'You may also like',
};

export const SECTION_HEADINGS = {
  phones: 'Mobile phones',
  tablets: 'Tablets',
  favorites: 'Favorites',
  cart: 'Cart',
};

export const PRICE_TEXT_SIZES = {
  large: 'product-price--lg',
};
