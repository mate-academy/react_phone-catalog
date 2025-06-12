import { CartProvider } from './Context/CartContext';
import { FavouriteProvider } from './Context/FavoriteContext';
import { LoadingProvider } from './Context/LoadingContext';

type Props = {
  children: React.ReactNode;
};

export const AppProvider: React.FC<Props> = ({ children }) => {
  return (
    <LoadingProvider>
      <FavouriteProvider>
        <CartProvider>{children}</CartProvider>
      </FavouriteProvider>
    </LoadingProvider>
  );
};
