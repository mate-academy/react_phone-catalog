import { useContext, useEffect, useState } from 'react';
import { DispatchContext, StateContext } from '../store/GlobalProvider';
import { Product } from '../types/Product';
import { ItemType } from '../types/ItemType';

export const useToggleItem = (prod: Product, itemType: ItemType) => {
  const { favourites, cart } = useContext(StateContext);
  const dispatch = useContext(DispatchContext);
  const [isItem, setIsItem] = useState(false);

  useEffect(() => {
    const itemList = itemType === 'favourites' ? favourites : cart;
    const isItemInList = itemList.some(item => item.itemId === prod.itemId);

    setIsItem(isItemInList);
  }, [prod.itemId, itemType, favourites, cart]);

  const toggleItem = () => {
    if (isItem) {
      dispatch({
        type: 'removeItem',
        itemType,
        payload: prod.itemId,
      });
    } else {
      dispatch({
        type: 'addItem',
        itemType,
        payload: prod,
      });
    }

    setIsItem(!isItem);
  };

  return { isItem, toggleItem };
};

export const useCart = (prod: Product) => {
  return useToggleItem(prod, 'cart');
};

export const useFavourite = (prod: Product) => {
  return useToggleItem(prod, 'favourites');
};
