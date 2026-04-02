const API_BASE = '/api';

export async function request<T>(path: string): Promise<T> {
  const response = await fetch(`${API_BASE}${path}`);

  if (!response.ok) {
    throw new Error('Failed to load data');
  }

  return response.json();
}
