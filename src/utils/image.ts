const BASE = import.meta.env.BASE_URL;

export function resolveImage(path?: string): string {
  if (!path) return '';

  if (path.startsWith('http')) {
    return path;
  }

  let clean = path.trim();

  if (clean.startsWith('/')) {
    clean = clean.slice(1);
  }

  if (!clean.startsWith('img/')) {
    clean = `img/${clean}`;
  }

  clean = clean
    .replaceAll('space gray', 'space-gray')
    .replaceAll('space-gray', 'space-gray')
    .replaceAll('rose gold', 'rose-gold')
    .replaceAll('sky blue', 'sky-blue');

  clean = clean.replace('img/img/', 'img/');

  return BASE + clean;
}