const BASE_URL = import.meta.env.BASE_URL.endsWith('/')
  ? import.meta.env.BASE_URL
  : `${import.meta.env.BASE_URL}/`;

export const getAssetPath = (relativePath: string) => {
  return `${BASE_URL}${relativePath}`;
};
