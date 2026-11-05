import { supabase } from '@/shared/api/supabase';
import type { Category } from '@/shared/types/Category';

export type ProductVariant = {
  id: string;
  name: string;
  color: string;
  capacity: string;
};

export type ProductComment = {
  id: string;
  productId: string;
  namespaceId: string;
  comment: string;
  username: string;
  rate: number;
  createdAt: string;
};

export type CreateComment = {
  productId: string;
  namespaceId: string;
  username: string;
  email: string;
  comment: string;
  rate: number;
};

export const commentsApi = {
  getByNamespace: async (namespaceId: string): Promise<ProductComment[]> => {
    const { data, error } = await supabase
      .from('public_comments')
      .select('*')
      .eq('namespaceId', namespaceId)
      .order('createdAt', { ascending: false });

    if (error) throw error;

    return data as ProductComment[];
  },

  getVariants: async (
    category: Category,
    namespaceId: string,
  ): Promise<ProductVariant[]> => {
    const { data, error } = await supabase
      .from(category)
      .select('id, name, color, capacity')
      .eq('namespace_id', namespaceId)
      .order('capacity');

    if (error) throw error;

    return data as ProductVariant[];
  },

  create: async (comment: CreateComment): Promise<void> => {
    const { error } = await supabase.from('comments').insert(comment);

    if (error) throw error;
  },
};
