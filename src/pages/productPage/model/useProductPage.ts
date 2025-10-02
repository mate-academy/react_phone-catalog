import { Status, useLoadItems } from '@features/index';
import { get } from '@shared/api';
import { Product } from '@shared/types';
import { useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

export const useProductPage = () => {
  const { productId } = useParams<{ productId: string }>();
  const item = useLoadItems(() => get.product(productId as string));

  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from || '/';

  const onButton = () => {
    navigate(from);
  };

  const onLink = (e: React.MouseEvent, link: string) => {
    e.preventDefault();
    navigate(link, {
      state: { from: from },
    });
  };

  useEffect(() => {
    item.loadItems();
  }, [productId]);

  return { prod: item.items as Product | Status, onButton, onLink };
};
