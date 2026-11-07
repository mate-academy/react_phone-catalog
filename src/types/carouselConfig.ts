type BreakpointParams = {
  slides: number;
  height: number;
};

export type CarouselConfig = {
  mobile: BreakpointParams;
  tablet?: BreakpointParams;
  desktop?: BreakpointParams;
};
