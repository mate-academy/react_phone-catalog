type Item = {
  id: string;
};

export const isItemIncluded = (items: Item[], itemId: string) => {
  return items.some(item => item.id === itemId);
};
