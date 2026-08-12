export const normalizeProductOption = (value: string) => {
  return value.toLowerCase().replace(/\s+/g, '').replace(/-/g, '');
};
