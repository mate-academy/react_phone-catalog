export const editProductName = (name: string) => {
  return name
    .split('-')
    .join(' ');
};
