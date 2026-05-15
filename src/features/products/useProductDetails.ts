import { useEffect, useMemo, useState } from 'react';
import type { Product, ProductDetails, ProductWithDetails } from '../../types/product';
import { getPublicUrl } from '../../utils/publicPath';

const detailFileByCategory: Record<string, string> = {
  phones: 'phones.json',
  tablets: 'tablets.json',
  accessories: 'accessories.json',
};

const toArray = <T>(value?: T | T[]): T[] => {
  if (value === undefined || value === null) {
    return [];
  }

  return Array.isArray(value) ? value : [value];
};

const getDetailFile = (category?: string) =>
  category ? detailFileByCategory[category] : undefined;

export function useProductDetails(baseProduct?: Product | null) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [details, setDetails] = useState<ProductDetails | null>(null);

  useEffect(() => {
    if (!baseProduct) {
      setDetails(null);
      setError(null);
      setLoading(false);

      return;
    }

    const fileName = getDetailFile(baseProduct.category);

    if (!fileName) {
      setDetails(null);
      setError('Unknown product category');
      setLoading(false);

      return;
    }

    let isActive = true;

    setLoading(true);
    setError(null);

    fetch(getPublicUrl(`api/${fileName}`))
      .then(response => {
        if (!response.ok) {
          throw new Error(`Failed to load ${fileName}`);
        }

        return response.json() as Promise<ProductDetails[]>;
      })
      .then(items => {
        if (!isActive) {
          return;
        }

        const itemDetails = items.find(item => item.id === baseProduct.itemId);

        setDetails(itemDetails ?? null);
      })
      .catch((err: Error) => {
        if (!isActive) {
          return;
        }

        setDetails(null);
        setError(err.message);
      })
      .finally(() => {
        if (isActive) {
          setLoading(false);
        }
      });

    return () => {
      isActive = false;
    };
  }, [baseProduct]);

  const mergedProduct = useMemo(() => {
    if (!baseProduct) {
      return null;
    }

    const images = toArray(details?.images ?? details?.images ?? baseProduct.image);
    const colorsAvailable = toArray(
      details?.colorsAvailable ?? details?.color ?? baseProduct.color,
    );
    const capacityAvailable = toArray(details?.capacityAvailable ?? baseProduct.capacity);
    const detailsWithoutId = { ...details };

    delete detailsWithoutId.id;

    return {
      ...baseProduct,
      ...detailsWithoutId,
      images,
      colorsAvailable,
      capacityAvailable,
      description: details?.description ?? null,
    } as ProductWithDetails;
  }, [baseProduct, details]);

  return { mergedProduct, loading, error };
}
