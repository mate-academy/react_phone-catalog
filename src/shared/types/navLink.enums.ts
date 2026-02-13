import { Category } from './entities.enums';

enum RoutePath {
  GITHUB = 'https://github.com/DrDakka?tab=repositories',
  CONTACTS = '/contacts',
  RIGHTS = '/rights',
  HOME = '/',
  PHONES = '/phones',
  TABLETS = '/tablets',
  ACCESSORIES = '/accessories',
  FAVOURITES = '/favourites',
  CART = '/cart',
}

enum NavTitles {
  HOME = 'home',
  PHONES = Category.PHONES,
  TABLETS = Category.TABLETS,
  ACCESSORIES = Category.ACCESSORIES,
  GIT = 'github',
  CONTACTS = 'contacts',
  RIGHTS = 'rights & policies',
}

enum NavAriaLabels {
  OPEN_MENU = 'Open navigation menu',
  CLOSE_MENU = 'Close navigation menu',
  FAVOURITES = 'Go to favorites page',
  CART = 'Go to cart page',
  ADD_TO_FAV = 'Add to favourites',
  RM_FAM = 'Remove from favourites',
  ADD_TO_CART = 'Add to cart',
  RM_CART = 'Remove from cart',
}

export { RoutePath, NavTitles, NavAriaLabels };
