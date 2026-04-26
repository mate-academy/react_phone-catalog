const BASE_URL = 'http://localhost:5173/api';

export async function getData<T>(url: string): Promise<T> {
  const res = await fetch(BASE_URL + url);

  if (!res.ok) {
    throw new Error(`Request failed: ${res.status} ${res.statusText}`);
  }

  return res.json() as Promise<T>;
}
