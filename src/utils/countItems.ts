import { StorageItem } from '../types/StorageItem';

export const countItems = (items: StorageItem[]): number =>
  items.reduce((sum, { quantity }) => sum + quantity, 0);
