export const getAssetUrl = (path: string) => {
  const normalized = path.replace(/^\/+/, '');

  return `${import.meta.env.BASE_URL}${normalized}`;
};
