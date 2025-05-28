export const getPhones = async () => {
  const response = await fetch('./api/phones.json');

  if (!response.ok) {
    throw new Error('Failed to fetch phones');
  }

  return response.json();
};

export const getTablets = async () => {
  const response = await fetch('./api/tablets.json');

  if (!response.ok) {
    throw new Error('Failed to fetch tablets');
  }

  return response.json();
};

export const getAccessories = async () => {
  const response = await fetch('./api/accessories.json');

  if (!response.ok) {
    throw new Error('Failed to fetch accessories');
  }

  return response.json();
};
