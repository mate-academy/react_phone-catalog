const BASE_URL = '/api';

async function request<T>(url: string): Promise<T> {
  const response = await fetch(BASE_URL + url);

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
}

export const fetchClient = {
  get: <T>(url: string) => request<T>(url),

  getProducts: () => request('/products.json'),
  getPhones: () => request('/phones.json'),
  getTablets: () => request('/tablets.json'),
  getAccessories: () => request('/accessories.json'),
};
