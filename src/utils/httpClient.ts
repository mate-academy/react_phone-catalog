import { wait } from './wait';

const BASE_URL = './api';

export async function getData<T>(url: string): Promise<T> {
  await wait(200);

  const response = await fetch(BASE_URL + url);

  if (!response.ok) {
    throw new Error(`${response.status} ${response.statusText}`);
  }

  return response.json();
}
