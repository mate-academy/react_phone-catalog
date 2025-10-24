import {
  Category,
  get,
  ItemsAmount,
  LoadStatus,
  Order,
  useLoadItems,
} from '@shared/api';
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
    if (item.items === LoadStatus.ERROR) {
      navigate('/404', {
        state: {
          message: 'Product was not found',
          from: location.pathname,
        },
        replace: true,
      });
    }
  }, [item.items]);

  return {
    prod: item.items,
    sliderItems: sliderData.items,
  };
};
