/**
 * Перетворює назву кольору на валідну назву CSS-класу,
 * замінюючи пробіли на дефіси та переводячи у нижній регістр.
 * Наприклад: 'Space Gray' -> 'color-space-gray'
 * @param colorName - Назва кольору з даних продукту
 * @returns Назва CSS-класу
 */
export const getColorClassName = (colorName: string): string => {
  return `color-${colorName.toLowerCase().replace(/\s+/g, '-')}`;
};
