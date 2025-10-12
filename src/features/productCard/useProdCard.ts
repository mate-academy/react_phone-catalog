import { useMemo } from 'react';
import { useGlobalActions, useGlobalData } from '../globalStore/appContext';
import { Item } from '@features/globalStore/types';

const handler = (e: React.MouseEvent, fn: (item: Item) => void, item: Item) => {
  e.preventDefault();
  e.stopPropagation();
  fn(item);
  (e.currentTarget as HTMLElement).blur();
};

export const useProdCard = () => {
  const { itemsInFav, itemsInCart } = useGlobalData();
  const { toggleFav, setCart } = useGlobalActions();

  const items = {
    favorites: useMemo(
      () => new Set(itemsInFav.map(el => el.id)),
      [itemsInFav],
    ),
    cart: useMemo(() => new Set(itemsInCart.map(el => el.id)), [itemsInCart]),
  };

  const isIn = {
    fav: (itemId: string) => {
      return items.favorites.has(itemId);
    },
    cart: (itemId: string) => {
      return items.cart.has(itemId);
    },
  };

  const toggleCatCart = (item: Item) => {
    const amount = +!isIn.cart(item.id);

    setCart({ ...item, amount });
  };

  const stateHandlers = {
    toggleCart: (e: React.MouseEvent, item: Item) =>
      handler(e, toggleCatCart, item),
    toggleFav: (e: React.MouseEvent, item: Item) => handler(e, toggleFav, item),
  };

  return { stateHandlers, items, isIn };
};
