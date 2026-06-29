export type IconImageModifiers =
  | 'favorites'
  | 'cart'
  | 'close'
  | 'home'
  | 'home__active'
  | 'menu'
  | 'favorites_active'
  | 'arrowLeft'
  | 'arrowRight'
  | 'sun'
  | 'moon'
  | 'disabled'
  | 'rotate_90';

type IconTypes =
  | 'type_tablet'
  | 'type_mobile'
  | 'border'
  | 'border_bottom'
  | 'width_100'
  | 'type_slider'
  | 'type_slider__disabled'
  | 'type_add'
  | 'type_add__selected'
  | 'type_mobile_menu';
export interface IconStyles {
  icon?: IconTypes | IconTypes[];
  image: IconImageModifiers | IconImageModifiers[];
}
