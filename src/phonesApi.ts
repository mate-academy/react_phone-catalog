const BASE_URL = `${import.meta.env.BASE_URL}api/`;

export const getPhones = async () => {
  const res = await fetch(`${BASE_URL}phones.json`);

  if (!res.ok) {
    throw new Error('Failed to load phones');
  }

  return res.json();
};

export const getPhoneById = async (id: string) => {
  const res = await fetch(`${BASE_URL}phones/${id}.json`);

  if (!res.ok) {
    throw new Error('Phone not found');
  }

  return res.json();
};
