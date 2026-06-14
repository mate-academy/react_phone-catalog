export const NavigationLinks = {
  Favorite: 'Favorite',
  Cart: 'Cart',
};

export type NavigationLinkType =
  (typeof NavigationLinks)[keyof typeof NavigationLinks];
