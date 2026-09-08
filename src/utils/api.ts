const delay = () => new Promise(resolve => setTimeout(resolve, 500));

const fetchData = async (url: string) => {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Failed to fetch data from ${url}`);
    }

    if (!navigator.onLine) {
      throw new Error('No internet connection');
    }

    return await response.json();
  } catch (error) {
    throw error;
  }
};

export const getPhones = async () => {
  await delay();

  return fetchData('api/phones.json');
  // https://taniavozniuk.github.io/react_phone-catalog2.0/api/phones.json'
};

export const fetchTable = async () => {
  await delay();

  return fetchData('api/tablets.json');
  // https://taniavozniuk.github.io/react_phone-catalog2.0/api/tablets.json
};

export const fetchAccessories = async () => {
  await delay();

  return fetchData('api/accessories.json');
  // https://taniavozniuk.github.io/react_phone-catalog2.0/api/accessories.json
};

export const fetchProducts = async () => {
  await delay();

  return fetchData('api/products.json');
  // https://taniavozniuk.github.io/react_phone-catalog2.0/api/products.json
};

export const fetchAllProducts = async () => {
  await delay();
  const [phonesData, tabletsData, accessoriesData] = await Promise.all([
    getPhones(),
    fetchTable(),
    fetchAccessories(),
  ]);

  return [...phonesData, ...tabletsData, ...accessoriesData];
};
