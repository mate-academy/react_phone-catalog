import { Status, useLoadItems } from '@features/index';
import { get } from '@shared/api';
import { Product } from '@shared/types';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

export const useProductPage = () => {
  const { productId } = useParams<{ productId: string }>();
  const item = useLoadItems(() => get.product(productId as string));

  useEffect(() => {
    item.loadItems();
  }, [productId]);

  return { prod: item.items as Product | Status };
};
