export const normalizeColorForUrl = (color: string): string => {
  return color.toLowerCase().replace(/\s+/g, '-').trim();
};
