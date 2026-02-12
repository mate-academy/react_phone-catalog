import { useMemo } from 'react';
import { useGlobalState } from '../store/GlobalStateProvider';
import { Product } from '../types/Product';

export const useFavorites = () => {
  const { state, dispatch } = useGlobalState();
  const items = state.favorites.items;

  const count = useMemo(() => items.length, [items]);

  return {
    items,
    count,

    toggle: (product: Product) =>
      dispatch({ type: 'TOGGLE_FAVORITE', payload: product }),

    isFavorite: (id: number) => items.some(item => item.id === id),
  };
};
