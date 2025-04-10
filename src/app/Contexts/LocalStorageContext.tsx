import { useMemo } from 'react';
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

  const updateFavList = (product: Product) => {
    const existingItem = favItems.find(favItem => favItem.id === product.id);
    if (existingItem) {
      setFavItems(favItems.filter(favItem => favItem.id !== product.id));
    } else {
      setFavItems([...favItems, product]);
    }
  };

  const handleAddToCart = (product: Product) => {
    const newCartItems = cartItems.map(item => {
      if (item.id === product.id && item.quantity) {
        return { ...product, quantity: item.quantity + 1 };
      }

      return item;
    });

    setCartItems(newCartItems);
  };

  const handleDeleteFromCart = (product: Product) => {
    const newCartItems = cartItems.map(item => {
      if (item.id === product.id && item.quantity) {
        return { ...product, quantity: item.quantity - 1 };
      }

      return item;
    });

    setCartItems(newCartItems);
  };

  const handleCartUpdate = (product: Product) => {
    const existingItem = cartItems.find(cartItem => cartItem.id === product.id);
    if (existingItem) {
      setCartItems(cartItems.filter(cartItem => cartItem.id !== product.id));
    } else {
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    }
  };

  const deleteOnCheckout = () => {
    setCartItems([]);
  };

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
    [cartItems, favItems],
  );

  return (
    <LocalStorageContext.Provider value={values}>
      {children}
    </LocalStorageContext.Provider>
  );
};
