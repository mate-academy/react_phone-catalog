import { useCallback, useEffect, useState } from 'react';
import { ProductDetails } from '../../../../types/ProductDetails';
import { COLOR_MAP } from '../../../shared/constants/colors';

const BASE_PATH = import.meta.env.BASE_URL;

export const useProductConfig = (product: ProductDetails) => {
  const [availableIds, setAvailableIds] = useState<string[]>([]);

  useEffect(() => {
    fetch(`${BASE_PATH}/api/${product.category}.json`)
      .then(res => res.json())
      .then((data: ProductDetails[]) => {
        setAvailableIds(data.map(p => p.id));
      })
      .catch(() => setAvailableIds([]));
  }, [product.category]);

  const getProductLink = useCallback(
    (newCapacity: string, newColor: string) => {
      const formattedCapacity = newCapacity.toLowerCase().replace(/\s+/g, '');
      const formattedColor = newColor.toLowerCase().replace(/\s+/g, '-');

      return `/product/${product.namespaceId}-${formattedCapacity}-${formattedColor}`;
    },
    [product.namespaceId],
  );

  const getColorHex = useCallback((colorName: string) => {
    const colorKey = colorName.toLowerCase().replace(/\s+/g, '');

    return COLOR_MAP[colorKey] || colorKey;
  }, []);

  return {
    getProductLink,
    getColorHex,
    availableIds,
  };
};
