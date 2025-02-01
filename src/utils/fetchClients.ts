export async function getData<T>(url: string): Promise<T> {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error('Can`t get data from the server');
  }

  return response.json();
}
