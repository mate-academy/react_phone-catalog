import { Item } from '@features/globalStore/types';
import { Status } from '@features/index';
import { CatalogueProduct } from '@shared/types';

type IsIn = {
  fav: (itemId: string) => boolean;
  cart: (itemId: string) => boolean;
};

type StateHandlers = {
  toggleCart: (e: React.MouseEvent, item: Item) => void;
  toggleFav: (e: React.MouseEvent, item: Item) => void;
};

const FALLBACK_ARRAY_LENGTH = 8;

const FALLBACK_ARRAY = Array.from(
  { length: FALLBACK_ARRAY_LENGTH },
  (_, i) => i,
);

const organizeCardProps = (
  el: number | CatalogueProduct,
  isIn: IsIn,
  stateHandlers: StateHandlers,
) => {
  if (typeof el === 'number') {
    return {
      key: el,
      data: Status.LOADING,
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

export { FALLBACK_ARRAY, organizeCardProps };
