// Utility functions will be defined here

export function getImageUrl(path: string): string {
  const normalized = path.startsWith('/') ? path.slice(1) : path;
  const base = import.meta.env.BASE_URL.endsWith('/')
    ? import.meta.env.BASE_URL
    : `${import.meta.env.BASE_URL}/`;

  return `${base}${normalized}`;
}
