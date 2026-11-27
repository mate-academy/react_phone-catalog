const baseUrl = 'api/';

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const loadDataFromApi = async (url: string) => {
  await delay(500);

  const response = await fetch(`${baseUrl}${url}`);

  if (!response.ok) {
    throw new Error('Failed to fetch');
  }

  return response.json();
};

export const client = {
  fetchIPhones: () => loadDataFromApi('phones.json'),
  fetchTablets: () => loadDataFromApi('tablets.json'),
  fetchAccessories: () => loadDataFromApi('accessories.json'),
  fetchProducts: () => loadDataFromApi('products.json'),
};
