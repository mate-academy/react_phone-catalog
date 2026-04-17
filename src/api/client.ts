const API_BASE = `${import.meta.env.BASE_URL}`;

export async function request<T>(path: string): Promise<T> {
  const response = await fetch(`${API_BASE}api/${path}`);

  if (!response.ok) {
    throw new Error('Failed to load data');
  }

  return response.json();
}
