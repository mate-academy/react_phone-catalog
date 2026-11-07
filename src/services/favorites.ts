import { supabase } from './supabase';
import type { FavouriteProduct } from '../types/FavouriteProduct';
import type { Phone, Tablet, Accessory } from '../types/api';

export async function saveFavorite(userId: string, product: FavouriteProduct) {
  const { error } = await supabase.from('user_favorites').upsert(
    {
      user_id: userId,
      product_id: product.id,
      category: product.category,
    },
    {
      onConflict: 'user_id,category,product_id',
      ignoreDuplicates: true,
    },
  );

  if (error) {
    throw error;
  }
}

export async function removeFavorite(
  userId: string,
  product: FavouriteProduct,
) {
  const { error } = await supabase
    .from('user_favorites')
    .delete()
    .eq('user_id', userId)
    .eq('product_id', product.id)
    .eq('category', product.category);

  if (error) {
    throw error;
  }
}

export async function fetchFavoriteProducts(
  userId: string,
): Promise<FavouriteProduct[]> {
  const { data: rows, error } = await supabase
    .from('user_favorites')
    .select('product_id, category')
    .eq('user_id', userId);

  if (error) {
    throw error;
  }

  const phoneIds = rows
    .filter((row) => row.category === 'phones')
    .map((row) => row.product_id);

  const tabletIds = rows
    .filter((row) => row.category === 'tablets')
    .map((row) => row.product_id);

  const accessoryIds = rows
    .filter((row) => row.category === 'accessories')
    .map((row) => row.product_id);

  const phones: Phone[] = [];
  const tablets: Tablet[] = [];
  const accessories: Accessory[] = [];

  if (phoneIds.length > 0) {
    const { data, error } = await supabase
      .from('phones')
      .select('*')
      .in('id', phoneIds);

    if (error) throw error;

    phones.push(
      ...(data ?? []).map(
        (product) => ({ ...product, category: 'phones' }) as Phone,
      ),
    );
  }

  if (tabletIds.length > 0) {
    const { data, error } = await supabase
      .from('tablets')
      .select('*')
      .in('id', tabletIds);

    if (error) throw error;

    tablets.push(
      ...(data ?? []).map(
        (product) => ({ ...product, category: 'tablets' }) as Tablet,
      ),
    );
  }

  if (accessoryIds.length > 0) {
    const { data, error } = await supabase
      .from('accessories')
      .select('*')
      .in('id', accessoryIds);

    if (error) throw error;

    accessories.push(
      ...(data ?? []).map(
        (product) =>
          ({
            ...product,
            category: 'accessories',
          }) as Accessory,
      ),
    );
  }

  return [...phones, ...tablets, ...accessories];
}
