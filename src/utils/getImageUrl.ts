export const getImg = (path: string): string => {
  const base = import.meta.env.BASE_URL; // '/react_phone-catalog/'
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;

  const baseWithSlash = base.endsWith('/') ? base : `${base}/`;

  return `${baseWithSlash}${cleanPath}`;
};
