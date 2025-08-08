enum RoutePath {
  Github = 'https://github.com/DrDakka?tab=repositories',
  Contacts = '/contacts',
  Rights = '/rights',
  Home = '/',
  Phones = '/phones',
  Tablets = '/tablets',
  Accessories = '/accessories',
  Favorites = '/favorites',
  Cart = '/cart',
}

enum NavElementName {
  Home = 'home',
  Phones = 'phones',
  Tablets = 'tablets',
  Accessories = 'accessories',
  Github = 'github',
  Contacts = 'contacts',
  Rights = 'rights & policies',
}

enum NavAriaLabels {
  Menu = 'Open navigation menu',
  CloseMenu = 'Close navigation menu',
  Home = 'Go to homepage',
  Phones = 'Go to phones catalog page',
  Tablets = 'Go to tablets catalog page',
  Accessories = 'Go to accessories catalog page',
  Favorites = 'Go to favorites page',
  Cart = 'Go to cart page',
  Github = 'Visit our github',
  Contacts = 'Go to contacts page',
  Rights = 'Go to rights and policies page',
}

interface NavLinkProps {
  title: NavElementName;
  path: RoutePath;
  ariaLabel: NavAriaLabels;
}

export { RoutePath, NavElementName, NavAriaLabels, type NavLinkProps };
