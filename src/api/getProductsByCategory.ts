export const getProductsByCategory = async (category: string) => {
  const allowedCategories = ['phones', 'tablets', 'accessories'];

  if (!allowedCategories.includes(category)) {
    throw new Error(`Invalid category: ${category}`);
  }

  const response = await fetch(`/react_phone-catalog/api/${category}.json`);

  if (!response.ok) {
    throw new Error(`Failed to fetch ${category}`);
  }

  return response.json();
};
