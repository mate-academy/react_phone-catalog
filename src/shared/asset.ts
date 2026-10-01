export function getAssetUrl(path: string) {
  if (path.startsWith('http://') || path.startsWith('https://')) {
    return path;
  }

  const cleanPath = path.replace(/^\/+/, '');
  const base = import.meta.env.DEV ? '/' : '/react_phone-catalog/';

  return `${base}${cleanPath}`;
}
