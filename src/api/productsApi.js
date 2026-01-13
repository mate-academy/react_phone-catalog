const BASE_URL = process.env.PUBLIC_URL || '';

export const getPhones = async () => {
  const response = await fetch(`${BASE_URL}/api/phones.json`);
  return response.json();
};

export const getTablets = async () => {
  const response = await fetch(`${BASE_URL}/api/tablets.json`);
  return response.json();
};

export const getAccessories = async () => {
  const response = await fetch(`${BASE_URL}/api/accessories.json`);
  return response.json();
};
