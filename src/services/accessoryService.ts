// services/phoneService.ts

import { Accessory } from '../interfaces/Product';

const API_URL = '/api/accessories.json';

let accessoriesCache: Accessory[] | null = null;

async function getAll(limit?: number): Promise<Accessory[]> {
  if (accessoriesCache === null) {
    const response = await fetch(API_URL);

    if (!response.ok) {
      throw new Error('Failed to fetch tablets');
    }

    accessoriesCache = await response.json();
  }

  return limit ? accessoriesCache!.slice(0, limit) : accessoriesCache!;
}

async function getById(id: string): Promise<Accessory | null> {
  const all = await getAll();

  return all.find(p => p.id === id) ?? null;
}

export const accessoryService = {
  getAll,
  getById,
};
