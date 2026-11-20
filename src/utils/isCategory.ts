import { Product } from '../types/Product';

export const TITLES: Record<Product['category'], string> = {
  phones: 'Mobile phones',
  tablets: 'Tablets',
  accessories: 'Accessories',
};

export const isCategory = (value?: string): value is Product['category'] =>
  value !== undefined && value in TITLES;
