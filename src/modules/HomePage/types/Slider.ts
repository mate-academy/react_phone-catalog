export type Slider = {
  imgs: string[];
  idx?: number;
  ShowDotsImg: boolean;
  onIdx?: (callback: (prev: number) => number) => void;
  start: React.MutableRefObject<number | null>;
  end: React.MutableRefObject<number | null>;
  onAnimated: (value: boolean) => void;
};
