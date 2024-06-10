import { client } from './fetchClient';

export async function getLocalStorageOrApi<T>(
  key: string,
  url: string,
): Promise<T> {
  const data = localStorage.getItem(key);

  if (!data) {
    const apiData = await client.get<T>(url);

    localStorage.setItem(key, JSON.stringify(apiData));

    return apiData;
  }

  return JSON.parse(data);
}
