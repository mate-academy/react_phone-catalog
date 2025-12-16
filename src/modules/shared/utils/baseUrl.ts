export const withBase = (path: string) => {
  const clean = path.replace(/^\//, '');

  return `${import.meta.env.BASE_URL}${clean}`;
};
