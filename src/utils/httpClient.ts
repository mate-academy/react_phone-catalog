const API_BASE_URL = './api';

export async function getData<T>(url: string): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${url}`);

  if (!response.ok) {
    const errorMessage = await response.text();

    throw new Error(`${response.status} ${errorMessage}`);
  }

  return response.json();
}
