// Функція для форматування назви кольору в URL (наприклад, "space gray" -> "space-gray")
export const formatUrlColor = (color: string): string => {
  return color.toLowerCase().replace(/\s+/g, '-');
};

// Функція для формування itemId на основі namespaceId, capacity та color
export const generateItemId = (
  namespaceId: string,
  capacity: string, // Наприклад, "128GB" або "44mm"
  color: string, // Наприклад, "black" або "space gray"
): string => {
  const formattedColor = formatUrlColor(color);

  return `${namespaceId}-${capacity.toLowerCase()}-${formattedColor}`;
};

// Функція для генерації повного URL сторінки продукту
export const generateProductPageUrl = (
  category: string,
  namespaceId: string,
  capacity: string,
  color: string,
): string => {
  const itemId = generateItemId(namespaceId, capacity, color);

  return `/${category}/${itemId}`;
};
