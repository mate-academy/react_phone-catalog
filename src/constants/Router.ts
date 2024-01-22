export const enum PAGE {
  Home = '/',
  Favorites = 'favorites',
  Cart = 'cart',
}

export type Params = {
  category: Category,
  productId: string,
};

export enum Category {
  Phones = 'phones',
  Tablets = 'tablets',
  Accessories = 'accessories',
}

export const enum SearchParam {
  Search = 'search',
}
