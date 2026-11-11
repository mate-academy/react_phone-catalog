// services/phoneService.ts

import { Phone } from '../interfaces/Product';

const API_URL = '/api/phones.json';

let phonesCache: Phone[] | null = null;

async function getAll(limit?: number): Promise<Phone[]> {
  if (phonesCache === null) {
    const response = await fetch(API_URL);

    if (!response.ok) {
      throw new Error('Failed to fetch phones');
    }

    phonesCache = await response.json();
  }

  return limit ? phonesCache!.slice(0, limit) : phonesCache!;
}

async function getById(id: string): Promise<Phone | null> {
  const all = await getAll();

  return all.find(p => p.id === id) ?? null;
}

export const phoneService = {
  getAll,
  getById,
};
