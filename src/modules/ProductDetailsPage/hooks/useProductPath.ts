import { useNavigate } from 'react-router-dom';

import { productPathGenerator } from '../utils/productPathGenerator';
import { useCallback } from 'react';
import { useDetailsProduct } from '../../../hooks/context/useDetailsProduct';

export const useProductPath = () => {
  const navigate = useNavigate();
  const { product } = useDetailsProduct();

  if (!product) {
    throw new Error('Product not found');
  }
  const nameSpaceId = product.namespaceId;
  const capacity = product.capacity;
  const color = product.color;
  const category = product.category;

  const changeCapacity = useCallback(
    (newCapacity: string) => {
      const url = productPathGenerator(
        nameSpaceId,
        newCapacity,
        color,
        category,
      );

      navigate(url, { replace: true });
    },
    [product, navigate],
  );

  const changeColor = useCallback(
    (newColor: string) => {
      const url = productPathGenerator(
        nameSpaceId,
        capacity,
        newColor,
        category,
      );

      navigate(url, { replace: true });
    },
    [product, navigate],
  );

  return { changeCapacity, changeColor };
};
