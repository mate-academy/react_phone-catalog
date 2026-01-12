export const getPhones = async () => {
  const response = await fetch('/api/phones.json');
  return response.json();
};

export const getTablets = async () => {
  const response = await fetch('/api/tablets.json');
  return response.json();
};

export const getAccessories = async () => {
  const response = await fetch('/api/accessories.json');
  return response.json();
};
