export function getImageUrl(path: string): string {
  const baseUrl = import.meta.env.BASE_URL.replace(/\/$/, '');
  const imagePath = path.replace(/^\//, '');

  return `${baseUrl}/${imagePath}`;
}
