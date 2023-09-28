import { BASE_URL } from './helpers/consts';

function wait(delay: number) {
  return new Promise(resolve => setTimeout(resolve, delay));
}

function request<T>(url: string): Promise<T> {
  return wait(500)
    .then(() => fetch(BASE_URL + url))
    .then(response => {
      if (!response.ok) {
        const status = response.status
          ? ` Response status = ${response.status}`
          : '';
        const statusText = response.statusText
          ? ` Status text = ${response.statusText}`
          : '';
        const errorText = `Unable to connect from the server.
          ${status}${statusText}`;

        throw new Error(errorText);
      }

      return response.json();
    });
}

export const client = {
  get: <T>(url: string) => request<T>(url),
};
