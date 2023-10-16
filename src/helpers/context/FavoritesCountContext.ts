import { createContext } from 'react';

export const FavoritesCountContext = createContext({
  increment: () => {},
  decrement: () => {},
});
