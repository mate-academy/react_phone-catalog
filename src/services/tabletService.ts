// services/phoneService.ts

import { Tablet } from '../interfaces/Product';

const API_URL = '/api/tablets.json';

let tabletsCache: Tablet[] | null = null;

async function getAll(limit?: number): Promise<Tablet[]> {
  if (tabletsCache === null) {
    const response = await fetch(API_URL);

    if (!response.ok) {
      throw new Error('Failed to fetch tablets');
    }

    tabletsCache = await response.json();
  }

  return limit ? tabletsCache!.slice(0, limit) : tabletsCache!;
}

async function getById(id: string): Promise<Tablet | null> {
  const all = await getAll();

  return all.find(p => p.id === id) ?? null;
}

export const tabletService = {
  getAll,
  getById,
};
