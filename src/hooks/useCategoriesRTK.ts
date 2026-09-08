// src/hooks/useCategoriesRTK.ts
import { ProductsType } from '../types/ProductsType';
import { useGetProductsByCategoryQuery } from '../app/services/productsApi';
import { Product } from '../types/ProductType';

type State = {
  categorie: Product[];
  loading: boolean;
  error: boolean;
};

export function useCategoriesRTK(api: ProductsType): State {
  const { data, isLoading, isError } = useGetProductsByCategoryQuery(api);

  return {
    categorie: data || [],
    loading: isLoading,
    error: isError,
  };
}
