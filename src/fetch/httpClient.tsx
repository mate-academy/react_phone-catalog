// const BASE_URL = 'http://localhost:5173/api';

export async function getData<T>(url: string): Promise<T> {
  try {
    const res = await fetch(url);

    if (!res.ok) {
      throw new Error('Failed to load products');
    }

    return await res.json();
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Fetch failed', error);
    throw error;
  }
}
