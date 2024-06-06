const BASE_URL =
  'https://g0odvin.github.io/react_phone-catalog/api/products.json';

const PRODUCT_DETAILS = 'https://g0odvin.github.io/react_phone-catalog/api/';

function wait(delay: number) {
  return new Promise(resolve => {
    setTimeout(resolve, delay);
  });
}

type RequestMethod = 'GET';

function request<T>(
  // url: string,
  method: RequestMethod = 'GET',
  data: any = null,
): Promise<T> {
  const options: RequestInit = { method };

  if (data) {
    options.body = JSON.stringify(data);
    options.headers = {
      'Content-Type': 'application/json; charset=UTF-8',
    };
  }

  return wait(500)
    .then(() => fetch(BASE_URL, options))
    .then(response => {
      if (!response.ok) {
        throw new Error();
      }

      return response.json();
    });
}

function request2<T>(
  url: string,
  method: RequestMethod = 'GET',
  data: any = null,
): Promise<T> {
  const options: RequestInit = { method };

  if (data) {
    options.body = JSON.stringify(data);
    options.headers = {
      'Content-Type': 'application/json; charset=UTF-8',
    };
  }

  return wait(2000)
    .then(() => fetch(`${PRODUCT_DETAILS}${url}.json`, options))
    .then(response => {
      if (!response.ok) {
        throw new Error();
      }

      return response.json();
    });
}

function requestForAll<T>(
  url: string,
  method: RequestMethod = 'GET',
  data: any = null,
): Promise<T> {
  const options: RequestInit = { method };

  if (data) {
    options.body = JSON.stringify(data);
    options.headers = {
      'Content-Type': 'application/json; charset=UTF-8',
    };
  }

  return wait(2000)
    .then(() => fetch(`${PRODUCT_DETAILS}${url}.json`, options))
    .then(response => {
      if (!response.ok) {
        throw new Error();
      }

      return response.json();
    });
}

export const client = {
  get: <T>() => request<T>(),
};

export const client2 = {
  get: <T>(url: string) => request2<T>(url),
};

export const clientForAll = {
  get: <T>(url: string) => requestForAll<T>(url),
};

// export const client3 = {
//   get: <T>() => request3<T>(),
// };

// export const productDetails = {
//   get: <T>(url: string) => request2<T>(url),
// };
