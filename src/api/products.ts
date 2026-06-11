const fetchData = async (url: string) => {
  const res = await fetch(url);

  if (!res.ok) {
    throw new Error('Failed to load data');
  }

  return res.json();
};

export const getProducts = () => fetchData('/api/products.json');

export const getPhones = () => fetchData('/api/phones.json');

export const getAccessories = () => fetchData('/api/accessories.json');

export const getTablets = () => fetchData('/api/tablets.json');
