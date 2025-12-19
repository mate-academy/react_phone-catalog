function wait(delay: number = 5000) {
  return new Promise(resolve => setTimeout(resolve, delay));
}

const BASE_URL = '/api';

function request<T>(url: string): Promise<T> {
  return wait()
    .then(() => fetch(`${BASE_URL}/${url}`))
    .then(res => res.json());
}

export const client = {
  get: <T>(url: string) => request<T>(url),
};
