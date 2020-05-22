const API_URL = 'https://mate-academy.github.io/react_phone-catalog/api/products';

export const getPhones = async (): Promise<Phone[]> => {
  const response = await fetch(`${API_URL}.json`);

  return response.json();
};

export const getPhoneDetails = async (): Promise<PhoneDetails[]> => {
  const response = await fetch(`${API_URL}/motorola-xoom.json`);

  return response.json();
};
