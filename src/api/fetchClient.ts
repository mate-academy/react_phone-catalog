// src/api/fetchClient.ts
const BASE_URL = './api';

export const client = {
  // Дженерик <T> означає, що функція поверне дані того типу, який ми попросимо
  async get<T>(url: string): Promise<T> {
    const response = await fetch(`${BASE_URL}${url}`);

    if (!response.ok) {
      throw new Error(`Failed to fetch: ${response.statusText}`);
    }

    return response.json();
  },
};
