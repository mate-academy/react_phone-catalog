export const getImageUrl = (path: string) => {
  if (!path) {
    return '';
  }

  // Беремо базовий шлях
  const baseUrl = import.meta.env.BASE_URL;

  // Гарантуємо, що baseUrl закінчується на слеш, а шлях картинки НЕ починається зі слеша
  const cleanBase = baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`;
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;

  return `${cleanBase}${cleanPath}`;
};
