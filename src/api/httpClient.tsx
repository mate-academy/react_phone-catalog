type Method = 'GET' | 'POST' | 'PUT' | 'DELETE';

const BASE_URL = import.meta.env.BASE_URL.endsWith('/')
  ? `${import.meta.env.BASE_URL}api`
  : `${import.meta.env.BASE_URL}/api`;

async function request<T>(url: string, method: Method = 'GET'): Promise<T> {
  const finishedUrl = BASE_URL + url;
  const res = await fetch(finishedUrl, { method: method });

  if (res.ok) {
    return res.json();
  }

  throw new Error();
}

export const client = {
  get<T>(url: string) {
    return request<T>(url);
  },
};
