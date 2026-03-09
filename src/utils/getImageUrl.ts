export const getImg = (path: string): string => {
  const base = import.meta.env.BASE_URL;
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  const result = `${base}${cleanPath}`;

  // eslint-disable-next-line no-console
  console.log('base:', base, 'result:', result);

  return result;
};
