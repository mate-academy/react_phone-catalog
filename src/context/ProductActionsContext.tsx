import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';

type ProductActionsContextType = {
  cart: string[];
  liked: string[];

  toggleCart: (id: string) => void;
  toggleLike: (id: string) => void;

  addToCart: (id: string) => void;
  removeOneFromCart: (id: string) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
};

const ProductActionsContext = createContext<ProductActionsContextType | null>(
  null,
);

export const ProductActionsProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [cart, setCart] = useState<string[]>(() => {
    const saved = localStorage.getItem('cart');

    return saved ? JSON.parse(saved) : [];
  });

  const [liked, setLiked] = useState<string[]>(() => {
    const saved = localStorage.getItem('liked');

    return saved ? JSON.parse(saved) : [];
  });

  const toggleCart = (id: string) => {
    setCart(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id],
    );
  };

  const addToCart = (id: string) => {
    setCart(prev => [...prev, id]);
  };

  const removeOneFromCart = (id: string) => {
    setCart(prev => {
      const index = prev.indexOf(id);

      if (index === -1) {
        return prev;
      }

      return prev.filter((_, i) => i !== index);
    });
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item !== id));
  };

  const toggleLike = (id: string) => {
    setLiked(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id],
    );
  };

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('liked', JSON.stringify(liked));
  }, [liked]);

  const clearCart = () => {
    setCart([]);
  };

  return (
    <ProductActionsContext.Provider
      value={{
        cart,
        liked,
        toggleCart,
        addToCart,
        removeOneFromCart,
        removeFromCart,
        toggleLike,
        clearCart,
      }}
    >
      {children}
    </ProductActionsContext.Provider>
  );
};

export const useProductActions = () => {
  const context = useContext(ProductActionsContext);

  if (!context) {
    throw new Error('useProductActions must be used inside Provider');
  }

  return context;
};
