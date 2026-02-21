const BASE_URL = '/public/api';

function wait(delay: number) {
  return new Promise(res => {
    setTimeout(res, delay);
  });
}

export async function client<T>(url: string): Promise<T> {
  await wait(500);

  const response = await fetch(BASE_URL + url);

  if (!response.ok) {
    throw new Error();
  }

  return response.json();
}
