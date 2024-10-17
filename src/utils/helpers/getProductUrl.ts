export const getProductUrl = (category: string, itemId: string) => {
  return `/categories/${category}/${itemId}`;
};

export const getCategoriesUrl = (category: string) => {
  return `/categories/${category}`;
};
