import { supabase } from '@/shared/api/supabase';

export type ProductRating = {
  namespaceId: string;
  rating: number;
  reviewsCount: number;
};

export const productRatingsApi = {
  getAll: async (): Promise<ProductRating[]> => {
    const { data, error } = await supabase.from('product_ratings').select('*');

    if (error) throw error;

    return data as ProductRating[];
  },

  getByNamespace: async (
    namespaceId: string,
  ): Promise<ProductRating | null> => {
    const { data, error } = await supabase
      .from('product_ratings')
      .select('*')
      .eq('namespaceId', namespaceId)
      .maybeSingle();

    if (error) throw error;

    return data as ProductRating | null;
  },
};
