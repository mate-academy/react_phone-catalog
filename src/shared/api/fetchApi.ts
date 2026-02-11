export async function fetchApi<T>(endpoint: string): Promise<T> {
  const response = await fetch(`./api/${endpoint}`);

  if (!response.ok) {
    throw new Error(`Failed to fetch ${endpoint}: ${response.statusText}`);
  }

  const data: T = await response.json();

  return data;
}
