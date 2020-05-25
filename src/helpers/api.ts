const API_URL = 'https://mate-academy.github.io/react_phone-catalog/api';

export const getGoods = async (): Promise<Good[]> => {
  const response = await fetch(API_URL);
  return response.json();
};
