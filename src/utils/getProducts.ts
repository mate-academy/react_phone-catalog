import { FetchDataType } from '../types/FetchDataType';

const API_URL = `api/`;

export async function getProducts(
  productType: FetchDataType,
  signal: AbortSignal,
) {
  const response = await fetch(API_URL + productType + '.json', { signal });

  if (!response.ok) {
    throw new Error(`Failing to fetch ${productType}`);
  }

  return response.json();
}
