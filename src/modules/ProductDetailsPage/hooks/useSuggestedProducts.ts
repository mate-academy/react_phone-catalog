//#region imports
import { useMemo } from 'react';
import { useAppSelector } from '../../../store/hooks';
import { Product } from '../../shared/types/Product';
//#endregion

export function useSuggestedProducts() {
  const products = useAppSelector(state => state.products.items);

  const suggestedProducts: Product[] = useMemo(
    () => [...products].sort(() => Math.random() - 0.5).slice(0, 10),
    [products],
  );

  return suggestedProducts;
}
