const API_URL = 'https://mate-academy.github.io/react_phone-catalog/api/products';

export const fetchProducts = async (): Promise<Product[]> => {
  const response = await fetch(`${API_URL}.json`);

  return response.json();
};

export const fetchProductDetails = async (): Promise<ProductDetails[]> => {
  const response = await fetch(`${API_URL}/motorola-xoom.json`);

  return response.json();
};
