const API_URL = '/api/products.json';

export const getGoods = async (): Promise<Good[]> => {
  const response = await fetch(API_URL);
  return response.json();
};
