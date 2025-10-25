import { ItemType } from '../types/data';

// eslint-disable-next-line operator-linebreak
const API_URL = 'http://localhost:5173/api/';

export async function getCategory(category: string): Promise<ItemType[]> {
  return fetch(`${API_URL}${category}.json`).then(response => response.json());
}
