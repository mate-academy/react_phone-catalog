export function publicPath(path: string): string {
  const base = import.meta.env.BASE_URL.replace(/\/+$/, '');

  return `${base}/${path.replace(/^\/+/, '')}`;
}
