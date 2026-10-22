export const withBase = (path: string) =>
  `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`;
