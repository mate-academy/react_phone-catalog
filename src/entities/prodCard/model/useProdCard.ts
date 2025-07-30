import { BaseProduct } from '@shared/types/APITypes';
import { useStoreContext } from '@features/user-store/model/storeContext';

type Props = {
  id: BaseProduct['id'];
};

export const useProdCard = ({ id }: Props) => {
  const {
    handleAddFavorite,
    handleAddCart,
    handleRemoveFavorite,
    handleRemoveFromCart,
    getItemInFavs,
    getItemInCart,
  } = useStoreContext();

  const resolveCart = () => {
    if (getItemInCart(id) === true) {
      handleRemoveFromCart({ item: id, amount: 1 });
    } else {
      handleAddCart({ item: id, amount: 1 });
    }
  };

  const resolveFav = () => {
    if (getItemInFavs(id) === true) {
      handleRemoveFavorite(id);
    } else {
      handleAddFavorite(id);
    }
  };

  const handler = (e: React.MouseEvent, fn: () => void) => {
    e.preventDefault();
    e.stopPropagation();
    fn();
    (e.currentTarget as HTMLElement).blur();
  };

  return {
    handleCart: (e: React.MouseEvent) => handler(e, resolveCart),
    handleFav: (e: React.MouseEvent) => handler(e, resolveFav),
    isInFav: getItemInFavs(id),
    isInCart: getItemInCart(id),
  };
};
