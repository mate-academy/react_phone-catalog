export enum ArrDir {
  Previous = 'prev',
  Next = 'next',
}

export type SwiperData = {
  src: string;
  alt: string;
  href: string;
};

export enum SwiperMode {
  Strict = 'strict',
  Free = 'free',
}

export enum Loop {
  true,
  false,
}
