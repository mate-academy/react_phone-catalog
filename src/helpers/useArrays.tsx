import { addPhonesInCart, deletePhonesInCart } from '../features/cartSlice';
import {
  addFavouritePhones,
  deleteFavouritePhones,
} from '../features/favouritesSlice';
import { useAppDispatch, useAppSelector } from '../store';
import { TypeCard } from '../types/TypeCard';

export const useCartPhones = () => {
  const dispatch = useAppDispatch();

  const cartPhones = useAppSelector(
    (state) => state.cartPhones.phonesInCart,
  );

  return (thisCard?: TypeCard) => {
    if (thisCard) {
      if (cartPhones.some(item => item.id === thisCard.id)) {
        dispatch(deletePhonesInCart(thisCard));

        return;
      }

      dispatch(addPhonesInCart(thisCard));
    }
  };
};

export const useFavouritesPhones = () => {
  const dispatch = useAppDispatch();

  const favouritesPhones = useAppSelector(
    (state) => state.favouritesPhones.favouritesPhones,
  );

  return (thisCard?: TypeCard) => {
    if (thisCard) {
      if (favouritesPhones.some(item => item.id === thisCard.id)) {
        dispatch(deleteFavouritePhones(thisCard));

        return;
      }

      dispatch(addFavouritePhones(thisCard));
    }
  };
};
