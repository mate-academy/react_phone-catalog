const delay = () => new Promise(resolve => setTimeout(resolve, 500));

const fetchData = async (url: string) => {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Failed to fetch data`);
    }

    if (!navigator.onLine) {
      throw new Error(`No internet connection`);
    }

    return await response.json();
  } catch (error) {
    throw error;
  }
};

export const fetchPhones = async () => {
  await delay();

  return fetchData('api/phones.json');
};

export const fetchTablets = async () => {
  await delay();

  return fetchData('api/tablets.json');
};

export const fetchAccessories = async () => {
  await delay();

  return fetchData('api/accessories.json');
};

export const fetchProducts = async () => {
  await delay();

  return fetchData('api/products.json');
};

export const fetchAllProducts = async () => {
  await delay();
  const [phonesData, tabletsData, accessoriesData] = await Promise.all([
    fetchPhones(),
    fetchTablets(),
    fetchAccessories(),
  ]);

  return [...phonesData, ...tabletsData, ...accessoriesData];
};
