import { Category } from "./api";

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
  PerPage = 'perPage',
  Page = 'page',
}
