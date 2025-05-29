export enum MenuPath {
  burger = '/burger-menu-16px.png',
  fav = '/fav-16px.png',
  cart = '/cart-16px.png',
}

export type MenuButtonsProps = {
  name: string;
  path: MenuPath;
};
