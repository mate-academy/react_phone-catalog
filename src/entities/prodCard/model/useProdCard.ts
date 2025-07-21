import { BaseProduct } from '@shared/types/APITypes';
import { useStore } from '@features/user-store/model/useStore';

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
  } = useStore();

  const handleCart = (e: React.MouseEvent) => {
    e.preventDefault();
    const subject = { item: id, amount: 1 };

    if (getItemInCart(id) === true) {
      handleRemoveFromCart(subject);
    } else {
      handleAddCart(subject);
    }
  };

  const handleFav = (e: React.MouseEvent) => {
    e.preventDefault();
    if (getItemInFavs(id) === true) {
      handleRemoveFavorite(id);
    } else {
      handleAddFavorite(id);
    }
  };

  return {
    handleCart,
    handleFav,
    isInFav: getItemInFavs(id),
    isInCart: getItemInCart(id),
  };
};
