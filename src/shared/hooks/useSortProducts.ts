import { useMemo } from 'react';

import { getProductsBySort } from 'shared/helpers/sorting';
import { Product } from 'shared/types/Product';

export function useSortProducts(products: Product[], sortParam: string) {
  return useMemo(() => {
    return getProductsBySort(products, sortParam);
  }, [products, sortParam]);
}
