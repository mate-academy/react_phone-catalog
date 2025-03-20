const API = '/api/products.json';

export const fetchProducts = async () => {
  try {
    const response = await fetch(API);
    if (!response.ok) {
      throw new Error('Failed to fetch products');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching product", error);
    return [];
  }
};
