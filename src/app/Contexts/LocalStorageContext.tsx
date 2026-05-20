import { useCallback, useMemo } from 'react';
import { createContext } from 'react';
import { Product } from '../../types/Product';
import { useLocaleStorage } from '../../utils/customHooks';

interface LocalStorageContextType {
  cartItems: Product[];
  favItems: Product[];
  updateFavList: (p: Product) => void;
  addToCart: (p: Product) => void;
  deleteFromCart: (p: Product) => void;
  updateCart: (p: Product) => void;
  checkout: () => void;
}

export const LocalStorageContext = createContext<LocalStorageContextType>({
  cartItems: [],
  favItems: [],
  updateFavList: () => {},
  addToCart: () => {},
  deleteFromCart: () => {},
  updateCart: () => {},
  checkout: () => {},
});

export const LocalStorageContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [cartItems, setCartItems] = useLocaleStorage<Product[]>('cart', []);
  const [favItems, setFavItems] = useLocaleStorage<Product[]>('fav', []);

  const updateFavList = useCallback(
    (product: Product) => {
      const existingItem = favItems.find(favItem => favItem.id === product.id);

      if (existingItem) {
        setFavItems(favItems.filter(favItem => favItem.id !== product.id));
      } else {
        setFavItems([...favItems, product]);
      }
    },
    [favItems, setFavItems],
  );

  const handleAddToCart = useCallback(
    (product: Product) => {
      const newCartItems = cartItems.map(item => {
        if (item.id === product.id && item.quantity) {
          return { ...product, quantity: item.quantity + 1 };
        }

        return item;
      });

      setCartItems(newCartItems);
    },
    [cartItems, setCartItems],
  );

  const handleDeleteFromCart = useCallback(
    (product: Product) => {
      const newCartItems = cartItems.map(item => {
        if (item.id === product.id && item.quantity) {
          return { ...product, quantity: item.quantity - 1 };
        }

        return item;
      });

      setCartItems(newCartItems);
    },
    [cartItems, setCartItems],
  );

  const handleCartUpdate = useCallback(
    (product: Product) => {
      const existingItem = cartItems.find(
        cartItem => cartItem.id === product.id,
      );

      if (existingItem) {
        setCartItems(cartItems.filter(cartItem => cartItem.id !== product.id));
      } else {
        setCartItems([...cartItems, { ...product, quantity: 1 }]);
      }
    },
    [cartItems, setCartItems],
  );

  const deleteOnCheckout = useCallback(() => {
    setCartItems([]);
  }, [setCartItems]);

  const values = useMemo(
    () => ({
      cartItems,
      favItems,
      updateFavList: updateFavList,
      addToCart: handleAddToCart,
      deleteFromCart: handleDeleteFromCart,
      updateCart: handleCartUpdate,
      checkout: deleteOnCheckout,
    }),
    [
      deleteOnCheckout,
      handleAddToCart,
      handleCartUpdate,
      handleDeleteFromCart,
      updateFavList,
      cartItems,
      favItems,
    ],
  );

  return (
    <LocalStorageContext.Provider value={values}>
      {children}
    </LocalStorageContext.Provider>
  );
};
