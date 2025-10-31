type IconImageModifiers =
  | 'favorites'
  | 'close'
  | 'cart'
  | 'menu'
  | 'border'
  | 'favorites_active'
  | 'arrowLeft'
  | 'arrowRight'
  | 'disabled';

type IconTypes = 'tablet' | 'mobile' | 'cart';

export interface IconStyles {
  border?: boolean;
  borderType?: 'border_bottom';
  width?: 'width_100';
  type?: IconTypes;
  image: IconImageModifiers | IconImageModifiers[];
}
