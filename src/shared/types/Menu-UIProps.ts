export enum Path {
  Burger = '/burger-menu-16px.svg',
  Fav = '/fav-16px.svg',
  Cart = '/cart-16px.svg',
  Up = '/arrow-up.svg',
}

export enum HeaderButtonNames {
  Burger = 'Open burger-menu',
  Fav = 'Open favorites',
  Cart = 'Open cart',
}

export enum FooterButtonName {
  Top = 'Go to top',
}

export type ButtonsProps = {
  name: HeaderButtonNames | FooterButtonName;
  path: Path;
};
