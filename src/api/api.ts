const BASE_URL = 'https://mate-academy.github.io/react_phone-catalog/api/';

const request = async (value: string) => {
  try {
    return await fetch(`${BASE_URL}${value}`)
      .then(res => {
        return res.ok
          ? res.json()
          : Promise.reject(new Error('error'));
      });
  } catch {
    throw new Error('error');
  }
};

export const getAllProducts = async () => {
  const response = await request('products.json');

  return response;
};

export const getAllPhones = async () => {
  const response = await request('products.json')
    .then(devices => devices.filter((device: Product) => device.type === 'phone'));

  return response;
};

export const getAllTablets = async () => {
  const response = await request('products.json')
    .then(devices => devices.filter((device: Product) => device.type === 'tablet'));

  return response;
};

export const getAllAccessories = async () => {
  const response = await request('products.json')
    .then(devices => devices.filter((device: Product) => device.type === 'accessory'));

  return response;
};

export const getProduct = async (product: string) => {
  const response = await request(`products/${product}.json`);

  return response;
};
