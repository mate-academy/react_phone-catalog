const BASE_URL = '../../public/api/';

function request<T>(url: string, method = 'GET'): Promise<T> {
  return fetch(BASE_URL + url, { method }).then(response => {
    if (response.ok) {
      return response.json();
    }

    throw new Error(`Failed to load data from ${url}`);
  });
}

export const client = {
  get: <T>(url: string) => request<T>(url),
};
