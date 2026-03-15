import { useCallback } from 'react';
import { ProductDetails } from '../../../../types/ProductDetails';
import { COLOR_MAP } from '../../../shared/constants/colors';

export const useProductConfig = (product: ProductDetails) => {
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
  };
};
