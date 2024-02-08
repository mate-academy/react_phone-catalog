import { Category } from "../../api/products/server/types";

export const enum PAGE {
  Home = '/',
  Favorites = 'favorites',
  Cart = 'cart',
  Checkout = 'checkout',
}

export type Params = {
  category: Category,
  productId: string,
};

export const enum SearchParam {
  Search = 'search',
  PerPage = 'perPage',
  Page = 'page',
  Sort = 'sortBy',
}
