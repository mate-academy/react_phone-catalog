export enum Path {
  Burger = '/burger-menu.svg',
  Fav = '/fav.svg',
  Cart = '/cart.svg',
  Up = '/arrow-up.svg',
  Prev = '/arrow-prev.svg',
  Next = '/arrow-next.svg',
}

export enum ButtonNames {
  Burger = 'Open burger-menu',
  Fav = 'Open favorites',
  Cart = 'Open cart',
  Top = 'Go to top',
  Prev = 'Previous',
  Next = 'Next',
}

export type ButtonsProps = {
  name: ButtonNames;
  path?: Path;
};
