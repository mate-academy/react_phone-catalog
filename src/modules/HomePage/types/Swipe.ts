export type Swipe = {
  start: React.MutableRefObject<number | null>;
  end: React.MutableRefObject<number | null>;
  imgs: string[];
  onAnimate: (value: boolean) => void;
  onCurrentIndex: (callback: (prev: number) => number) => void;
};
