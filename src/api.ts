export const PHONES_URL = 'https://mate.academy/students-api/phones';

export const getPhones = async <P>(): Promise<P[]> => {
  const response = await fetch(PHONES_URL);
  const result = await response.json();

  return result.data;
};

export const getPhone = async <P>(id: string): Promise<P> => {
  const response = await fetch(`${PHONES_URL}/${id}`);
  const result = await response.json();

  return result;
};
