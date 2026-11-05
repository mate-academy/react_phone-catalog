import { supabase } from '@/shared/api/supabase';

export type TopSale = {
  product_id: number;
  quantity: number;
};

export const updateTopSales = async (
  productId: number,
  quantity: number,
): Promise<void> => {
  if (!Number.isInteger(productId) || productId <= 0) {
    throw new Error('Invalid product ID');
  }

  if (!Number.isInteger(quantity) || quantity <= 0) {
    throw new Error('Quantity must be a positive integer');
  }

  const { error } = await supabase.rpc('increment_top_sales', {
    p_product_id: productId,
    p_quantity: quantity,
  });

  if (error) {
    throw new Error(`Failed to update top sales: ${error.message}`);
  }
};

export const getTopSales = async (): Promise<TopSale[]> => {
  const { data, error } = await supabase
    .from('topSales')
    .select('product_id, quantity');

  if (error) {
    throw new Error(`Failed to fetch top sales: ${error.message}`);
  }

  return data ?? [];
};
