import type { Accessory, Phone, Tablet } from '../types/api';
import { supabase } from './supabase';

type ProductTable = 'phones' | 'tablets' | 'accessories';

async function getProductsFromTable<T>(table: ProductTable): Promise<T[]> {
  const { data, error } = await supabase.from(table).select('*');

  if (error) {
    throw new Error(`Failed to load ${table}: ${error.message}`);
  }

  return data as T[];
}

export const getPhones = () => getProductsFromTable<Phone>('phones');
export const getTablets = () => getProductsFromTable<Tablet>('tablets');
export const getAccessories = () =>
  getProductsFromTable<Accessory>('accessories');
