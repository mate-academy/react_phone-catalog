const BASE_URL = './api'; // ./../public

function request<T>(url: string): Promise<T> {
  return fetch(BASE_URL + url)
    .then(response => {
      if (!response.ok) {
        throw new Error();
      }

      return response.json();
    })
    .catch(error => {
      throw error;
    });
}

export const client = {
  get: <T>(url: string) => request<T>(url),
};
