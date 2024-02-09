const BASE_URL = 'https://mate-academy.github.io/react_phone-catalog/_new';

function wait(delay: number) {
  return new Promise(resolve => setTimeout(resolve, delay));
}

async function request<T>(url: string): Promise<T> {
  return wait(500)
    .then(() => fetch(BASE_URL + url))
    .then(response => response.json());
}

export const client = {
  get: <T>(url: string) => request<T>(url),
};
