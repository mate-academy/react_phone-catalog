const BASE_URL = 'https://mate-academy.github.io/react_phone-catalog/_new';

const request = async (url: string) => {
  const res = await fetch(BASE_URL + url);

  if (!res.ok) {
    throw new Error();
  }

  return res.json();
};

export const getProducts = () => request('/products.json');
export const getSuggestedProducts = (id: string) => request(`/products/${id}.json`);
