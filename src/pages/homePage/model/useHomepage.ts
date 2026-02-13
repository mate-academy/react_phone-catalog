import { useLoadItems } from '@features/useUILoader';
import { get, PerPage, SortOrder } from '@shared/api';
import { Category } from '@shared/types';

const DATA_LOAD = {
  NEW: () =>
    get.catalogue({
      category: Category.ALL,
      sort: SortOrder.AGE,
      perPage: PerPage.ALL,
      page: 1,
    }),
  HOT: () =>
    get.catalogue({
      category: Category.ALL,
      sort: SortOrder.FULL_PRICE_DECS_PROMO,
      perPage: PerPage.ALL,
      page: 1,
    }),
};

export const useHomePage = () => {
  const newProducts = useLoadItems(() => DATA_LOAD.NEW());
  const promoProducts = useLoadItems(() => DATA_LOAD.HOT());
  const banners = useLoadItems(() => get.banners());

  const phonesAmount = useLoadItems(() => get.length(Category.PHONES));
  const tabletsAmount = useLoadItems(() => get.length(Category.TABLETS));
  const accessoriesAmount = useLoadItems(() =>
    get.length(Category.ACCESSORIES),
  );

  return {
    products: {
      new: newProducts.data,
      promo: promoProducts.data,
    },
    banners: banners.data,
    amount: {
      phones: phonesAmount.data,
      tablets: tabletsAmount.data,
      accessories: accessoriesAmount.data,
    },
  };
};
