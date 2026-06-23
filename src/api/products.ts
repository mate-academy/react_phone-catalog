const fetchData = async (url: string) => {
  const cleanUrl = url.startsWith('/') ? url.slice(1) : url;

  const fullUrl = `${import.meta.env.BASE_URL}/${cleanUrl}`;

  const res = await fetch(fullUrl);

  if (!res.ok) {
    throw new Error('Failed to load data');
  }

  return res.json();
};

export const getProducts = () => fetchData('/api/products.json');

export const getPhones = () => fetchData('/api/phones.json');

export const getAccessories = () => fetchData('/api/accessories.json');

export const getTablets = () => fetchData('/api/tablets.json');
