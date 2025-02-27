import { useMemo } from 'react';
import { createContext } from 'react';
import { ShopItem } from '../../types/ShopItem';
import { useLocaleStorage } from '../../utils/globalStyles/customHooks';

interface LocalStorageContextType {
  cartItems: ShopItem[];
  favItems: ShopItem[];
  updateFavList: (p: ShopItem) => void;
  addToCart: (p: ShopItem) => void;
  deleteFromCart: (p: ShopItem) => void;
  updateCart: (p: ShopItem) => void;
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
  const [cartItems, setCartItems] = useLocaleStorage<ShopItem[]>('cart', []);
  const [favItems, setFavItems] = useLocaleStorage<ShopItem[]>('fav', []);

  const updateFavList = (product: ShopItem) => {
    const existingItem = favItems.find(favItem => favItem.id === product.id);
    if (existingItem) {
      setFavItems(favItems.filter(favItem => favItem.id !== product.id));
    } else {
      setFavItems([...favItems, product]);
    }
  };

  const handleAddToCart = (product: ShopItem) => {
    const newCartItems = cartItems.map(item => {
      if (item.id === product.id && item.quantity) {
        return { ...product, quantity: item.quantity + 1 };
      }

      return item;
    });

    setCartItems(newCartItems);
  };

  const handleDeleteFromCart = (product: ShopItem) => {
    const newCartItems = cartItems.map(item => {
      if (item.id === product.id && item.quantity) {
        return { ...product, quantity: item.quantity - 1 };
      }

      return item;
    });

    setCartItems(newCartItems);
  };

  const handleCartUpdate = (product: ShopItem) => {
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
