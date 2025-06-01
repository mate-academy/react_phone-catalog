export enum MenuPath {
  burger = '/burger-menu-16px.svg',
  fav = '/fav-16px.svg',
  cart = '/cart-16px.svg',
}

export type MenuButtonsProps = {
  name: string;
  path: MenuPath;
};
