const BASE = import.meta.env.DEV ? '/' : '/react_phone-catalog/';

export const getImg = (path: string): string => {
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;

  return `${BASE}${cleanPath}`;
};
