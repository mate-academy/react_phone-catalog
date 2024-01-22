import { Category } from "./Category";

export const enum PAGE {
  Home = '/',
  Favorites = 'favorites',
  Cart = 'cart',
}

export type Params = {
  category: Category,
  productId: string,
};

export const enum SearchParam {
  Search = 'search',
}
