// wait is used for demonstration purposes
const wait = (delay: number) => {
  return new Promise(resolve => {
    setTimeout(resolve, delay);
  });
};

type RequestMethod = 'GET' | 'POST' | 'PATCH' | 'DELETE';

const BASE_URL = 'https://io-med.github.io/react_phone-catalog/api/';

const request = async <T>(
  path: string,
  method: RequestMethod = 'GET',
): Promise<T> => {
  const options: RequestInit = { method };

  await wait(800);

  const response = await fetch(`${BASE_URL}/${path}`, options);

  return response.json();
};

export const client = {
  get: <T>(path: string) => request<T>(path),
};
