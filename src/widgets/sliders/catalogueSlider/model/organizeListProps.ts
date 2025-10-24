import { Item } from '@features/globalStore/types';
import { LoadStatus } from '@features/index';
import { CatalogueProduct } from '@shared/types';

type IsIn = {
  fav: (itemId: string) => boolean;
  cart: (itemId: string) => boolean;
};

type StateHandlers = {
  toggleCart: (e: React.MouseEvent, item: Item) => void;
  toggleFav: (e: React.MouseEvent, item: Item) => void;
};

export const organizeCardProps = (
  el: number | CatalogueProduct,
  isIn: IsIn,
  stateHandlers: StateHandlers,
) => {
  if (typeof el === 'number') {
    return {
      key: el,
      data: LoadStatus.LOADING,
    };
  }

  return {
    key: el.id,
    data: {
      product: el,
      isIn: isIn,
      stateHandlers: stateHandlers,
    },
  };
};
