import { Status, useLoadItems } from '@features/index';
import { Category, get, ItemsAmount, Order } from '@shared/api';
import { CatalogueData } from '@shared/api/types';
import { Product } from '@shared/types';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const featured = () =>
  get.catalogue({
    itemType: Category.ALL,
    sort: Order.FULL_PRICE_DECS_PROMO,
    perPage: ItemsAmount.ALL,
    page: 1,
  });

export const useProductPage = () => {
  const { productId } = useParams<{ productId: string }>();
  const item = useLoadItems(() => get.product(productId as string));
  const sliderData = useLoadItems(featured);
  const navigate = useNavigate();

  useEffect(() => {
    item.loadItems();
    sliderData.loadItems();
  }, [productId]);

  useEffect(() => {
    if (item.items === Status.ERROR) {
      navigate('/404');
    }
  }, [item.items]);

  return {
    prod: item.items as Product | Status,
    sliderItems: sliderData.items as CatalogueData | Status,
  };
};
