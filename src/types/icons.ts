export enum IconId {
  Chevron = 'icon-chevron',
  Heart = 'icon-heart',
  HeartFilled = 'icon-heart-filled',
  Cart = 'icon-cart',
  Home = 'home',
  Close = 'close',
  Minus = 'minus',
  Plus = 'plus',
  Menu = 'menu',
  Sun = 'sun',
  Moon = 'moon',
}

export enum Directions {
  Up = 'up',
  Down = 'down',
  Left = 'left',
  Right = 'right',
}

export enum IconStyles {
  Filled = 'heartFilled',
  CloseCart = 'closeCart',
  Disabled = 'iconDisabled',
}

export type IconProps = {
  className?: string;
  id?: IconId;
  directions?: Directions;
  filled?: IconStyles;
};
