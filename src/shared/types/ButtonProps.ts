export enum IconPath {
  Burger = '/burger-menu.svg',
  Fav = '/fav.svg',
  Cart = '/cart.svg',
  Up = '/arrow-up.svg',
  Prev = '/arrow-prev.svg',
  Next = '/arrow-next.svg',
}

export enum AriaNames {
  Burger = 'Open burger-menu',
  Fav = 'Open favorites',
  Cart = 'Open cart',
  Top = 'Go to top',
  Prev = 'Previous',
  Next = 'Next',
  AddCart = 'Add to cart',
  AddFav = 'Add to favorites',
}

export type ButtonCN = {
  main: string;
  span?: string;
  icon?: string;
};
