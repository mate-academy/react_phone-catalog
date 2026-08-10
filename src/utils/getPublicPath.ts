const baseUrl = import.meta.env.BASE_URL.endsWith('/')
  ? import.meta.env.BASE_URL
  : `${import.meta.env.BASE_URL}/`;

export const getPublicPath = (path: string) =>
  `${baseUrl}${path.replace(/^\/+/, '')}`;
