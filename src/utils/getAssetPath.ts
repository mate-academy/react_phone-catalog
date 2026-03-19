const BASE_URL = import.meta.env.BASE_URL;

export const getAssetPath = (relativePath: string) => {
  const CLEAN_PATH_REGEX = /^\/+/;
  const normalizedPath = relativePath.replace(CLEAN_PATH_REGEX, '');

  return `${BASE_URL}${normalizedPath}`;
};
