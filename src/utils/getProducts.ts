import { FetchDataType } from '../types/FetchDataType';

const API_URL = `api/`;

export async function getProducts(
  productType: FetchDataType,
  signal: AbortSignal,
) {
  try {
    const response = await fetch(API_URL + productType + '.json', { signal });

    if (!response.ok) {
      throw new Error(`Failing to fetch ${productType}`);
    }

    return await response.json();
  } catch (error) {
    if (error instanceof DOMException && error.name === 'AbortError') {
      return [];
    }

    throw error;
  }
}
