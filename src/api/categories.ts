export const getPhones = async () => {
  const response = await fetch('/react_phone-catalog/api/phones.json');

  if (!response.ok) {
    throw new Error('Failed to fetch phones');
  }

  return response.json();
};

export const getTablets = async () => {
  const response = await fetch('/react_phone-catalog/api/tablets.json');

  if (!response.ok) {
    throw new Error('Failed to fetch tablets');
  }

  return response.json();
};

export const getAccessories = async () => {
  const response = await fetch('/react_phone-catalog/api/accessories.json');

  if (!response.ok) {
    throw new Error('Failed to fetch accessories');
  }

  return response.json();
};
