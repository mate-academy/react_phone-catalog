export const getProducts = async () => {
  const response = await fetch('/react_phone-catalog/api/products.json');

  if (!response.ok) {
    throw new Error('Failed to fetch products');
  }

  return response.json();
};
