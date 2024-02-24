/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/no-explicit-any */

const BASE_URL = 'https://mate-academy.github.io/react_phone-catalog/_new';
// const DETAILS_URL = 'https://mate-academy.github.io/react_phone-catalog/_new/products';

function wait(delay: number) {
  return new Promise(resolve => {
    setTimeout(resolve, delay);
  });
}

type RequestMethod = 'GET';

function request<T>(
  method: RequestMethod = 'GET',
  data: any = null,
): Promise<T> {
  const options: RequestInit = { method };

  let url = `${BASE_URL}/products.json`;

  if (typeof data === 'string') {
    url = `${BASE_URL}/products/${data}.json`;
  }

  // if (data) {
  //   options.headers = {
  //     'Content-Type': 'application/json; charset=UTF-8',
  //   };
  // }

  return wait(100).then(() => fetch(url, options)).then(response => {
    if (!response.ok) {
      throw new Error();
    }

    return response.json();
  });
}

export const client = {
  get: <T>() => request<T>(),
  getByID: <T>(id: string) => request<T>('GET', id),
};
