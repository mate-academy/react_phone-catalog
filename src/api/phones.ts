import { Phone } from "../types/Phone";

const API_URL = '/api/phones.json';

export function getPhones(): Promise<Phone[]> {
  return fetch(`${API_URL}`).then(res => {
    if (!res.ok) {
      throw new Error('Network response was not ok');
    }
   return res.json();
  });
}
