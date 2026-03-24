const BASE_URL = `${import.meta.env.BASE_URL}/api/`;

function wait(delay: number) {
  return new Promise(res => setTimeout(res, delay));
}

export async function client<T>(url: string): Promise<T> {
  await wait(500);

  const cleanUrl = url.replace(/^\//, '');

  const fullUrl = `${BASE_URL}${cleanUrl}`;

  const response = await fetch(fullUrl);

  if (!response.ok) {
    throw new Error(`${response.status} ${response.statusText}`);
  }

  return response.json();
}
