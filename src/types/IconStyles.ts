type IconImageModifiers =
  | 'favorites'
  | 'cart'
  | 'close'
  | 'home'
  | 'menu'
  | 'border'
  | 'favorites_active'
  | 'arrowLeft'
  | 'arrowRight'
  | 'disabled'
  | 'rotate_90';

type IconTypes =
  | 'type_tablet'
  | 'type_mobile'
  | 'border'
  | 'border_bottom'
  | 'width_100';

export interface IconStyles {
  icon?: IconTypes | IconTypes[];
  image: IconImageModifiers | IconImageModifiers[];
}
