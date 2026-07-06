const BASE_URL = `${import.meta.env.BASE_URL}/api`.replace('//', '/');

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const handleResponse = (response: Response) => {
  if (!response.ok) {
    throw new Error();
  }

  return response.json();
};

export async function get<T>(url: string): Promise<T> {
  const response = await fetch(BASE_URL + url);

  await delay(500);

  return handleResponse(response);
}
