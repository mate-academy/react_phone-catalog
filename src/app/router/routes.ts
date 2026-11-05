export const ROUTES = {
  HOME: '/',
  CATALOG: '/:catalogSlug',
  PRODUCT: '/:catalogSlug/:productSlug',
  FAVOURITES: '/favourites',
  CART: '/cart',
  CHECKOUT: '/checkout',
  NOTFOUND: '*',
  RIGHTS: '/rights',
  CONTACTS: '/contacts',
  HISTORY: '/history',
} as const;

export const routePaths = {
  catalog: (catalogSlug: string) => `/${encodeURIComponent(catalogSlug)}`,

  product: (catalogSlug: string, productSlug: string) =>
    `/${encodeURIComponent(catalogSlug)}/${encodeURIComponent(productSlug)}`,
};
