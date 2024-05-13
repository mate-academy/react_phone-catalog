const BASE_URL = '/api/';

export async function getProducts(url: string) {
  const response = await fetch(BASE_URL + url);
  const data = await response.json();

  return data;
}
