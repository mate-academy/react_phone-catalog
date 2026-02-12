import { useEffect, useMemo, useState } from 'react';
import { getProducts } from '../api/products';
import type { ProductListItem } from '../api/types';

export function useProductsIndex() {
  const [items, setItems] = useState<ProductListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const reload = () => {
    setLoading(true);
    setError(null);
    getProducts()
      .then(setItems)
      .catch(e => setError(String(e?.message || e)))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    reload();
  }, []);

  const byId = useMemo(() => {
    const map = new Map<string, ProductListItem>();

    for (const p of items) {
      map.set(p.itemId, p);
    }

    return map;
  }, [items]);

  return { items, byId, loading, error, reload };
}
