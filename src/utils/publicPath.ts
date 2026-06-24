const BASE_URL = import.meta.env.BASE_URL;

export const getPublicUrl = (url: string) =>
  `${BASE_URL}${url.replace(/^\/+/, '')}`;
