export const getAssetUrl = (path: string) => {
  const base = import.meta.env.BASE_URL;
  const cleanPath = path.replace(/^\/+/, '');

  return `${base}${cleanPath}`;
};
