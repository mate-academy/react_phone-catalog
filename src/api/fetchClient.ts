const BASE_URL = 'api';

export async function getData<TData>(url: string): Promise<TData> {
  const response = await fetch(`${BASE_URL}/${url}`);

  if (!response.ok) {
    throw new Error(`Error fetching data: ${response.statusText}`);
  }

  return response.json();
}
