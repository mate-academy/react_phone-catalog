export type IconImageModifiers =
  | 'favorites'
  | 'close'
  | 'cart'
  | 'menu'
  | 'border'
  | 'favorites_active';

export type IconTypes = 'tablet' | 'mobile' | 'cart';

export interface IconStyles {
  border?: boolean;
  type?: IconTypes;
  image: IconImageModifiers | IconImageModifiers[];
}
