import { Product } from '@/entities/Product';
import { createClient } from '@/shared/lib/supabase/client';

export const getClientProducts = async (): Promise<Product[]> => {
  const supabase = createClient();
  const { data, error } = await supabase.from('products').select('*');

  if (error) {
    console.error('Error Supabase (getClientProducts):', error.message);
    return [];
  }

  return data;
};
