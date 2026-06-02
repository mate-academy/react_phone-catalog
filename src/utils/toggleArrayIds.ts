export const toggleArrayIds = (array: number[], id: number) => {
  return array.includes(id)
    ? array.filter(itemId => itemId !== id)
    : [...array, id];
};
