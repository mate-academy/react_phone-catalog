export const BREAKPOINTS = {
  tablet: 640,
  desktop: 1200,
};

export const withBase = (path: string) =>
  `${import.meta.env.BASE_URL.replace(/\/$/, '')}/${path.replace(/^\//, '')}`;
