import React from 'react';
import { Key } from '../types/Key';
import { Product } from '../types/Product';
import { useLocalStorage } from '../customHooks/useLocalStorage';
import { CartProduct } from '../types/CartProduct';

type Props = {
  children: React.ReactNode;
};

type ProductActions = {
  handleAction: (item: Product, action: Key) => void;
  cartProducts: CartProduct[];
  favouritesIds: number[];
};

export const ActionContext = React.createContext<ProductActions>({
  handleAction: () => {},
  cartProducts: [],
  favouritesIds: [],
});

export const ActionProvider: React.FC<Props> = ({ children }) => {
  const [cartProducts, setCartProducts] = useLocalStorage<CartProduct[]>(
    'cart',
    [],
  );
  const [favouritesIds, setFavouritesIds] = useLocalStorage<number[]>(
    'favourites',
    [],
  );

  const handleAction = (item: Product, action: Key) => {
    switch (action) {
      case 'favourites':
        setFavouritesIds([...favouritesIds, item.id]);
        break;

      case 'cart': {
        setCartProducts([
          ...cartProducts,
          { id: item.id, count: 1, price: item.price },
        ]);
        break;
      }

      case 'removeFromFavourites':
        setFavouritesIds(favouritesIds.filter((n: number) => n !== item.id));
        break;

      case 'removeFromCart':
        setCartProducts(
          cartProducts.filter((p: CartProduct) => p.id !== item.id),
        );
        break;

      case 'plus': {
        const currentItem = cartProducts.find(data => data.id === item.id);

        if (currentItem) {
          currentItem.count += 1;
          const filteredCardProducts = cartProducts.filter(
            (p: CartProduct) => p.id !== item.id,
          );

          setCartProducts([...filteredCardProducts, currentItem]);
        }

        break;
      }

      case 'minus': {
        const currentItem = cartProducts.find(data => data.id === item.id);

        if (currentItem) {
          currentItem.count -= 1;
          const filteredCardProducts = cartProducts.filter(
            (p: CartProduct) => p.id !== item.id,
          );

          setCartProducts([...filteredCardProducts, currentItem]);
        }

        break;
      }

      default:
        break;
    }
  };

  const productActions = { handleAction, cartProducts, favouritesIds };

  return (
    <ActionContext.Provider value={productActions}>
      {children}
    </ActionContext.Provider>
  );
};
