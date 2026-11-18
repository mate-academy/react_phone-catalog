export const getPublicUrl = (path: string): string => {
  const baseUrl = import.meta.env.BASE_URL.replace(/\/+$/, '');

  return `${baseUrl}/${path.replace(/^\/+/, '')}`;
};
