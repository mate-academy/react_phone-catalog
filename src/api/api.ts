// eslint-disable-next-line max-len
export const BASE_URL = 'https://mate-academy.github.io/react_phone-catalog/api';

export async function getProducts() {
  try {
    const response = await fetch(`${BASE_URL}/products.json`);

    return await response.json();
  } catch (error) {
    return error;
  }
}

export async function getDetails(id: string | undefined) {
  try {
    const response = await fetch(`${BASE_URL}/products/${id}.json`);

    return await response.json();
  } catch (error) {
    return error;
  }
}
