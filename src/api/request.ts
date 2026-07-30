const BASE_URL = `${import.meta.env.BASE_URL.replace(/\/$/, '')}/api`;

export async function request<T>(url: string): Promise<T> {
  const response = await fetch(`${BASE_URL}/${url}`);

  if (!response.ok) {
    throw new Error(
      `Failed to load ${url}: ${response.status} ${response.statusText}`,
    );
  }

  return response.json() as Promise<T>;
}
