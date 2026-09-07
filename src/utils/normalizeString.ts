export const normalizeString = (value: string): string => {
  return String(value)
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '');
};
