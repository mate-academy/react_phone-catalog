const API_URL = 'https://mate-academy.github.io/react_phone-catalog/api/products';

export const fetchProducts = async (): Promise<Product[]> => {
  const response = await fetch(`${API_URL}.json`);

  return response.json();
};

export const fetchProductDetails = async (productId: string): Promise<ProductDetails> => {
  const response = await fetch(`${API_URL}/${productId}.json`);

  return response.json();
};
