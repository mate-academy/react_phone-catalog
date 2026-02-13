import { useLoadItems } from '@features/useUILoader';
import { get, PerPage, SortOrder } from '@shared/api';
import { Category } from '@shared/types';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

const featured = () =>
  get.catalogue({
    category: Category.ALL,
    sort: SortOrder.FULL_PRICE_DECS_PROMO,
    perPage: PerPage.ALL,
    page: 1,
  });

export const useProductPage = () => {
  const { productId } = useParams<{ productId: string }>();
  const item = useLoadItems(() => get.product(productId as string));
  const sliderData = useLoadItems(featured);

  useEffect(() => {
    item.reload();
    sliderData.reload();
  }, [productId]);

  return {
    prod: item.data,
    sliderItems: sliderData.data,
  };
};
