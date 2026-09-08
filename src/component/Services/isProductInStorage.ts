export const isProductInStorage = (id: string, favoriteIds: string[]) => {
  return favoriteIds.includes(id);
};
