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
