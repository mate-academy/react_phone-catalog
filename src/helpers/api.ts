const API_URL = 'https://mate-academy.github.io/react_phone-catalog/api';

export const getProducts = () => {
  return fetch('https://mate-academy.github.io/react_phone-catalog/api/products.json')
    .then(response => response.json());
};

export async function getProductDetails(id: string) {
  const response = await fetch(`${API_URL}/products/${id}.json`);

  return response.json();
}
