import { supabase } from '@/shared/api/supabase';

import type { Product } from '@/shared/types';
import type { Category } from '@/shared/types/Category';
import type { ProductDetailsByCategory } from '@/shared/types/ProductDetailsMap';
import type { With360ImageUrls, WithImageUrls } from '@/shared/types';

type WithImages = {
  images: string | string[];
};

type WithNamespace = WithImages & {
  namespace_id: string;
};

const STORAGE_BUCKET = 'images';

const getFullImageUrls = (item: WithImages): string[] => {
  const images = Array.isArray(item.images) ? item.images : [item.images];

  return images.map((imagePath) => {
    const { data } = supabase.storage
      .from(STORAGE_BUCKET)
      .getPublicUrl(imagePath);

    return data.publicUrl;
  });
};

const get360ImageUrls = async (namespaceId: string): Promise<string[]> => {
  const folderPath = `360/${namespaceId}`;

  const { data, error } = await supabase.storage
    .from(STORAGE_BUCKET)
    .list(folderPath, {
      limit: 1000,
      sortBy: {
        column: 'name',
        order: 'asc',
      },
    });

  if (error) {
    return [];
  }

  if (!data?.length) return [];

  return data
    .filter((file) => file.id !== null && /^\d+\.webp$/i.test(file.name))
    .sort(
      (first, second) =>
        Number.parseInt(first.name, 10) - Number.parseInt(second.name, 10),
    )
    .map(
      (file) =>
        supabase.storage
          .from(STORAGE_BUCKET)
          .getPublicUrl(`${folderPath}/${file.name}`).data.publicUrl,
    );
};

const withImageUrls = <T extends WithImages>(item: T): WithImageUrls<T> => ({
  ...item,
  imageUrls: getFullImageUrls(item),
});

const with360ImageUrls = async <T extends WithNamespace>(
  item: T,
): Promise<With360ImageUrls<T>> => {
  const image360Urls = await get360ImageUrls(item.namespace_id);

  return {
    ...withImageUrls(item),
    image360Urls,
  };
};

export const productApi = {
  getFullImageUrls,
  get360ImageUrls,

  getAll: async (): Promise<WithImageUrls<Product>[]> => {
    const pageSize = 1000;
    const products: Product[] = [];

    for (let from = 0; ; from += pageSize) {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('id', { ascending: true })
        .range(from, from + pageSize - 1);

      if (error) throw error;

      const batch = (data ?? []) as Product[];
      products.push(...batch);

      if (batch.length < pageSize) break;
    }

    return products.map(withImageUrls);
  },

  getBySlug: async (slug: string): Promise<WithImageUrls<Product> | null> => {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('item_id', slug)
      .maybeSingle();

    if (error) throw error;
    if (!data) return null;

    return withImageUrls(data as Product);
  },

  getByCategory: async (
    categorySlug: Category,
  ): Promise<WithImageUrls<Product>[]> => {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('category', categorySlug);

    if (error) throw error;

    return (data as Product[]).map(withImageUrls);
  },

  getByIds: async (ids: number[]): Promise<WithImageUrls<Product>[]> => {
    if (!ids.length) return [];

    const { data, error } = await supabase
      .from('products')
      .select('*')
      .in('id', ids);

    if (error) throw error;

    return (data as Product[]).map(withImageUrls);
  },

  getByIdInCategory: async <T extends Category>(
    table: T,
    id: string,
  ): Promise<With360ImageUrls<ProductDetailsByCategory<T>> | null> => {
    const { data, error } = await supabase
      .from(table)
      .select('*')
      .eq('id', id)
      .maybeSingle();

    if (error) throw error;
    if (!data) return null;

    const product = {
      ...data,
      category: table,
    } as ProductDetailsByCategory<T>;

    return with360ImageUrls(product);
  },

  getAllByCategory: async <T extends Category>(
    table: T,
  ): Promise<WithImageUrls<ProductDetailsByCategory<T>>[]> => {
    const { data, error } = await supabase.from(table).select('*');

    if (error) throw error;

    return data.map((item) => {
      const product = {
        ...item,
        category: table,
      } as ProductDetailsByCategory<T>;

      return withImageUrls(product);
    });
  },

  getByVariant: async <T extends Category>(
    table: T,
    namespace_id: string,
    color: string,
    capacity: string,
  ): Promise<WithImageUrls<ProductDetailsByCategory<T>> | null> => {
    const { data, error } = await supabase
      .from(table)
      .select('*')
      .eq('namespace_id', namespace_id)
      .eq('color', color)
      .eq('capacity', capacity)
      .maybeSingle();

    if (error) throw error;
    if (!data) return null;

    const product = {
      ...data,
      category: table,
    } as ProductDetailsByCategory<T>;

    return withImageUrls(product);
  },
};
