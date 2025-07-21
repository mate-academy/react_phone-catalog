enum IconPath {
  Up = '/arrow-up.svg',
  Prev = '/arrow-prev.svg',
  Next = '/arrow-next.svg',
}

enum AriaNames {
  Burger = 'Open burger-menu',
  Fav = 'Open favorites',
  Cart = 'Open cart',
  Top = 'Go to top',
  Prev = 'Previous',
  Next = 'Next',
  AddCart = 'Add to cart',
  RmCart = 'Remove from cart',
  AddFav = 'Add to favorites',
  RmFav = 'Remove from favorites',
  Home = 'Go to Homepage',
}

type ButtonCN = {
  main: string;
  span?: string;
  icon?: string;
};

export { IconPath, AriaNames, type ButtonCN };
