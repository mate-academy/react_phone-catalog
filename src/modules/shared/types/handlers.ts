export type HandleBurgerMenuLinkClick = () => void;
export type HandleReloadClick = () => void;
export type HandleSliderDragEvent =
  | React.MouseEvent<HTMLUListElement>
  | React.TouchEvent<HTMLUListElement>;
