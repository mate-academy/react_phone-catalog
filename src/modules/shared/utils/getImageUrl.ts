// src/modules/shared/utils/getImageUrl.ts
export function getImageUrl(path: string): string {
  if (/^https?:\/\//.test(path)) {
    return path;
  }

  const base = import.meta.env.BASE_URL;
  const cleanPath = path.replace(/^\//, '');

  return `${base}${cleanPath}`;
}
