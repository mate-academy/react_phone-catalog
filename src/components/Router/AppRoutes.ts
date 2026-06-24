export const AppRoutes = {
  HOME: '/',
  PHONES: 'phones',
  TABLETS: 'tablets',
  ACCESSORIES: 'accessories',
  FAVORITE: 'favorites',
  CART: 'cart',
  CONTACTS: 'contacts',
  RIGHTS: 'rights',
} as const;

export type AppRoutesType = (typeof AppRoutes)[keyof typeof AppRoutes];
