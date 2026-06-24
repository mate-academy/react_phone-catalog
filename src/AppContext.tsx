import { createContext } from 'react';
import { BasketProduct } from './types/BasketProduct';
import { FavoriteProduct } from './types/FavoriteProduct';

type AppContextType = {
  showMessage: boolean;
  favorites: FavoriteProduct[];
  setFavorites: React.Dispatch<React.SetStateAction<FavoriteProduct[]>>;
  baskets: BasketProduct[];
  setBaskets: React.Dispatch<React.SetStateAction<BasketProduct[]>>;
  removeBaskets: (itemId: string) => void;
  handleIncrease: (itemId: string) => void;
  handleDecrease: (itemId: string) => void;
  handleCheckout: () => void;
};

export const AppContext = createContext<AppContextType | null>(null);
