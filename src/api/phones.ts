import { ShopItem } from "../types/ShopItem";

const API_URL = '/api/phones.json';

export function getPhones(): Promise<ShopItem[]> {
  return fetch(`${API_URL}`).then(res => {
    if (!res.ok) {
      throw new Error('Network response was not ok');
    }
   return res.json();
  });
}
