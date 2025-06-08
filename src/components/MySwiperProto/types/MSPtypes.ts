export enum Direction {
  LEFT = 'left',
  RIGHT = 'right',
}

export type Autoplay = {
  direction: Direction;
  delay: number;
  times: number;
};

export type SwiperData = {
  src: string;
  alt: string;
  href: string;
};
