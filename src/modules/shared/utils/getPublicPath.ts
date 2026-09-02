export function getPublicPath(path: string): string {
  const base = import.meta.env.BASE_URL.replace(/\/+$/, '');
  const cleanPath = path.replace(/^\/+/, '');

  return `${base}/${cleanPath}`;
}
