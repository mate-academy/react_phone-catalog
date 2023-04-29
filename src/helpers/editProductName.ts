export const editProductName = (name: string) => {
  return name
    .split('-')
    .map(word => {
      return word.toLowerCase().includes('gb')
        ? word.toUpperCase()
        : word;
    }).join(' ');
};
