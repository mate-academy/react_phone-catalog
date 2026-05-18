const BASE_URL = import.meta.env.BASE_URL;

export const getImagePath = (src?: string): string => {
  if (!src) {
    return `${BASE_URL}img/placeholder.png`;
  }

  // If it already starts with http or https, return as is
  if (src.startsWith('http://') || src.startsWith('https://')) {
    return src;
  }

  // If it starts with /, remove it and prepend BASE_URL
  if (src.startsWith('/')) {
    return `${BASE_URL}${src.slice(1)}`;
  }

  // Otherwise, prepend BASE_URL with /
  return `${BASE_URL}${src}`;
};
