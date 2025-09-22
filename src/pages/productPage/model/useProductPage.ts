import { LoadingStates, useLoadItems } from '@features/index';
import { get } from '@shared/api';
import { Product } from '@shared/types';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export const useProductPage = () => {
  const { productId } = useParams<{ productId: string }>();
  const item = useLoadItems(() => get.product(productId as string));

  const navigate = useNavigate();

  useEffect(() => {
    item.loadItems();
  }, [productId]);

  useEffect(() => {
    if (item.items === null) {
      navigate('/404');
    }
  });

  return { item: item.items as Product | LoadingStates };
};
