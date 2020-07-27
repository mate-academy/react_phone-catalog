export const PRODUCTS_URL = 'https://mate-academy.github.io/react_phone-catalog/api/products.json';
// export const DETAILS_URL = '';

export const getData = async <T>(url: string): Promise<T[]> => {
  const response = await fetch(url);
  const result = await response.json();

  return result;
};

export const getDetails = async <T>(id: string): Promise<T> => {
  const response = await fetch(`https://mate-academy.github.io/react_phone-catalog/api/products/${id}.json`);
  const result = await response.json();

  return result;
};
