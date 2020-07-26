const BASE_URL = 'https://mate-academy.github.io/react_phone-catalog/api/products';

export const getProducts = () => {
  return fetch(`${BASE_URL}.json`)
    .then(response => response.json());
};

export async function getDetails(id: string) {
  const resp = await fetch(`${BASE_URL}/${id}.json`);

  return await resp.json();
}
