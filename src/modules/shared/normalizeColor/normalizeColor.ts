export const normalizeColor =(color: string): string => {
  return color
    .toLowerCase()
    .replace(/\s+/g, '')
    .trim();
}
