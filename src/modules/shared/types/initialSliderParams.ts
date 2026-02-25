export interface initialSliderParams {
  itemsCount: number;
  initialIndex?: number;
  loop?: boolean;
  autoplay: { enabled: boolean; interval: number };
  draggable?: boolean;
  breakpoints: { [width: number]: number };
}
