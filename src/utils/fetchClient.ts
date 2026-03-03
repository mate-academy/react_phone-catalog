const BASE_URL = '/api';

function wait(delay: number) {
  return new Promise(res => setTimeout(res, delay));
}

export async function client<T>(url: string): Promise<T> {
  await wait(500);

  const fullUrl = url.startsWith('/')
    ? `${BASE_URL}${url}`
    : `${BASE_URL}/${url}`;

  const response = await fetch(fullUrl);

  if (!response.ok) {
    throw new Error(`${response.status} ${response.statusText}`);
  }

  return response.json();
}
