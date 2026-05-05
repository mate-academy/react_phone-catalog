const BASE_URL = 'http://localhost:5173/api';

// const urls = [
//   BASE_URL + '/api/phones.json',
//   BASE_URL + '/api/tablets.json',
//   BASE_URL + '/api/accessories.json',
// ];

export async function getData<T>(url: string): Promise<T> {
  try {
    const res = await fetch(BASE_URL + url);

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
