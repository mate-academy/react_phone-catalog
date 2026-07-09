const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const withBase = (path: string) =>
  `${import.meta.env.BASE_URL.replace(/\/?$/, '/')}${path.replace(/^\/+/, '')}`;

const loadDataFromApi = async (url: string) => {
  await delay(500);

  const response = await fetch(withBase(`api/${url}`));

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
