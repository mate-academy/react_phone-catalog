const BASE_URL = process.env.PUBLIC_URL || '';

export const getPublicUrl = (url: string) => {
  const cleanBase = BASE_URL.replace(/\/+$/, '');

  const cleanUrl = url.replace(/^\/+/, '');

  return `${cleanBase}/${cleanUrl}`;
};
