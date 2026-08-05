// getUpdatedProductId.ts

export function getUpdatedProductId(
  namespaceId: string,
  capacity: string,
  color: string,
): string {
  // Перетворюємо пам'ять і колір у нижній регістр і прибираємо пробіли, якщо є
  const formattedCapacity = capacity.toLowerCase();
  const formattedColor = color.toLowerCase().replace(/\s+/g, '-');

  return `${namespaceId}-${formattedCapacity}-${formattedColor}`;
}
