// wait is used for demonstration purposes
const wait = (delay: number) => {
  return new Promise(resolve => {
    setTimeout(resolve, delay);
  });
};

type RequestMethod = 'GET' | 'POST' | 'PATCH' | 'DELETE';

const BASE_URL = '/api';

const request = async <T>(
  path: string,
  method: RequestMethod = 'GET',
  data = null,
): Promise<T> => {
  const options: RequestInit = { method };

  if (data) {
    options.body = JSON.stringify(data);
    options.headers = {
      'Content-Type': 'application/json; charset=UTF-8',
    };
  }

  await wait(800);

  const response = await fetch(`${BASE_URL}/${path}`, options);

  return response.json();
};

export const client = {
  get: <T>(path: string) => request<T>(path),
};
