// const BASE_URL = 'https://mate-academy.github.io/react_phone-catalog/api';
// eslint-disable-next-line max-len
const BASE_URL = 'https://mate-academy.github.io/react_phone-catalog/_new/';

type RequestMethod = 'GET' | 'POST' | 'PATCH' | 'DELETE';

function wait(delay: number) {
  return new Promise(res => {
    setTimeout(res, delay);
  });
}

function request<T>(
  url: string,
  method: RequestMethod = 'GET',
): Promise<T> {
  const options: RequestInit = { method };

  return wait(500)
    .then(() => fetch(`${BASE_URL + url}.json`, options))
    .then(response => {
      if (!response.ok) {
        throw new Error();
      }

      return response.json();
    });
}

export const client = {
  get: <T>(url: string) => request<T>(url),
};
