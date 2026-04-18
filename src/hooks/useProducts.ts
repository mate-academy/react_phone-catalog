import { useCallback, useEffect, useState } from 'react';
import type { Product } from '../../public/api/types/Product';

const URL: string = 'api/products.json';

export const useProducts = (url: string = URL) => {
  const [products, setProducts] = useState<Product[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const load = useCallback(
    async (signal?: AbortSignal) => {
      try {
        setLoading(true);
        setError(null);
        const res = await fetch(url, { signal });

        if (!res.ok) {
          throw new Error(`Network response was not ok (${res.status}`);
        }

        const data = await res.json();

        if (!Array.isArray(data)) {
          throw new Error('Invalid data format');
        }

        setProducts(data);
      } catch (err) {
        if ((err as DOMException)?.name === 'AbortError') {
          return;
        }

        setError((err as Error)?.message ?? 'Unknown error');
      } finally {
        setLoading(false);
      }
    },
    [url],
  );

  useEffect(() => {
    const ctrl = new AbortController();

    void load(ctrl.signal);

    return () => ctrl.abort();
  }, [load]);
  const reload = useCallback(() => {
    const ctrl = new AbortController();

    void load(ctrl.signal);
  }, [load]);

  return { products, loading, error, reload };
};

export const useProduct = (productId: string, url = URL) => {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const ctrl = new AbortController();
    const load = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch(url, { signal: ctrl.signal });

        if (!res.ok) {
          throw new Error(`Network response was not ok (${res.status})`);
        }

        const data = await res.json();

        if (!Array.isArray(data)) {
          throw new Error('Invalid data format');
        }

        const found = data.find(
          (p: Product) =>
            (String(p.id) === String(productId) && String(p.color) !== '') ||
            String((p as Product).itemId) === String(productId) ||
            String((p as Product).namespaceId) === String(productId),
        );

        if (!found) {
          setProduct(null);
          setError('Product not found');

          return;
        }

        const hasColors =
          Array.isArray(found.colorsAvailable) &&
          found.colorsAvailable.length > 0;
        const hasCapacities =
          Array.isArray(found.capacityAvailable) &&
          found.capacityAvailable.length > 0;

        if (!hasColors || !hasCapacities) {
          const detailsUrl = `api/${found.category}.json`;
          let detailsData = null;

          try {
            const detailsRes = await fetch(detailsUrl, { signal: ctrl.signal });

            if (detailsRes.ok) {
              detailsData = await detailsRes.json();
            } else {
              detailsData = null;
            }
          } catch (e) {
            if ((e as DOMException)?.name === 'AbortError') {
              throw e;
            }

            detailsData = null;
          }

          let detailsItem = null;

          if (Array.isArray(detailsData)) {
            detailsItem = detailsData.find(
              (d: object) => String(d.id) === String(found.itemId),
            );
          } else if (detailsData && typeof detailsData === 'object') {
            detailsItem = detailsData;
          }

          const merged = {
            ...found,
            ...(detailsItem || {}),
            productId: found?.id ?? null,
            productObj: found ?? null,
          };

          setProduct(merged);
        } else {
          setProduct(found);
        }
      } catch (err) {
        if ((err as DOMException)?.name === 'AbortError') {
          return;
        }

        setError((err as Error)?.message ?? 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    void load();

    return () => ctrl.abort();
  }, [productId, url]);

  return { product, loading, error };
};
