export const BREAKPOINT_NAMES = {
  mobile: 'mobile',
  tablet: 'tablet',
  desktop: 'desktop',
} as const;

export const BREAKPOINTS = {
  mobile: 320,
  tablet: 640,
  desktop: 1200,
} as const;

export type Breakpoint = keyof typeof BREAKPOINTS;
