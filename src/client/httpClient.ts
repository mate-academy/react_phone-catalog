const BASE_URL = 'api/';

const wait = (delay: number) => {
  return new Promise(resole => {
    setTimeout(resole, delay);
  });
};

type RequestMethod = 'GET' | 'POST' | 'PATCH' | 'DELETE';

const request = <T>(
  url: string,
  method: RequestMethod = 'GET',
  // eslint-disable-next-line
  data: any = null,
): Promise<T> => {
  const options: RequestInit = { method };

  if (data) {
    options.body = JSON.stringify(data);
    options.headers = {
      'Content-Type': 'application/json; charset=UTF-8',
    };
  }

  return wait(500)
    .then(() => fetch(BASE_URL + url, options))
    .then(response => {
      if (!response.ok) {
        throw new Error();
      }

      return response.json();
    });
};

export const client = {
  get: <T>(url: string) => request<T>(url),
};
