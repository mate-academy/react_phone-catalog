import { useNavigate } from 'react-router-dom';
import { ProductDetails } from '../../../../../types/ProductDetails';
import { useCallback } from 'react';

export const useProductNavigation = (
  selectedProduct: ProductDetails,
  specificProducts: ProductDetails[],
) => {
  const navigate = useNavigate();

  const findProductByOption = useCallback(
    (option: 'color' | 'capacity', value: string): string => {
      const {
        color: currentColor,
        namespaceId,
        capacity: currentCapacity,
      } = selectedProduct;

      const matchingProduct = specificProducts.find(
        ({ color, namespaceId: ns, capacity }) => {
          const isNamespaceMatch = ns === namespaceId;
          const isColorOption =
            option === 'color' &&
            color === value &&
            capacity === currentCapacity;
          const isCapacityOption =
            option === 'capacity' &&
            capacity === value &&
            color === currentColor;

          return isNamespaceMatch && (isColorOption || isCapacityOption);
        },
      );

      return matchingProduct?.id ?? '';
    },
    [selectedProduct, specificProducts],
  );

  const navigateToOption = useCallback(
    (option: 'color' | 'capacity', value: string) => {
      const productId = findProductByOption(option, value);
      const newPath = `/${selectedProduct.category}/${productId}`;

      navigate(newPath, { replace: true });
    },
    [findProductByOption, navigate, selectedProduct.category],
  );

  return { navigateToOption };
};
