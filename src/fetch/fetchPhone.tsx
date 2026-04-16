export type ProductPhone = {
  id: string;
  name: string;
  price: number;
  screen: string;
  capacity: string;
  ram: string;
  image: string;
};

export async function getPhone(): Promise<ProductPhone[]> {
  try {
    const res = await fetch('http://localhost:5173/api/phones.json');

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
