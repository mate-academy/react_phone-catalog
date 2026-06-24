import { Category } from '../types/catalog';

export const categoryLabels: Record<Category, string> = {
  phones: 'Phones',
  tablets: 'Tablets',
  accessories: 'Accessories',
};

export const categoryEmptyLabels: Record<Category, string> = {
  phones: 'There are no phones yet',
  tablets: 'There are no tablets yet',
  accessories: 'There are no accessories yet',
};

export const categoryRouteList: Category[] = [
  'phones',
  'tablets',
  'accessories',
];

export const getPublicAssetPath = (path: string) =>
  `${import.meta.env.BASE_URL}${path.replace(/^\/+/, '')}`;

export const normalizeImagePath = (path: string) =>
  getPublicAssetPath(path);
