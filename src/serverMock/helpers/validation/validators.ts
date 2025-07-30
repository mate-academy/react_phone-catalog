import { entryPoints, EntryPointValue } from '@server/static';
import {
  CatalogParams,
  CategoriesParams,
  ItemsOnPage,
  Sort,
} from '@server/types/types';

export const isValidParam = (
  params: CategoriesParams,
): params is CatalogParams => {
  const p = Object.values(params);
  const sample = { ...Object.values(Sort), ...Object.values(ItemsOnPage) };

  return !p.some(el => !sample.includes(el));
};

const validEntryPoints: EntryPointValue[] = Object.values(entryPoints);

export const isEntryPoint = (value: string): value is EntryPointValue => {
  return validEntryPoints.includes(value as EntryPointValue);
};
