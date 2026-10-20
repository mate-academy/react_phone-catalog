import { createContext, useEffect, useState, type ReactNode } from 'react';

export interface CartProviderProps {
  children: ReactNode;
}

export interface CartContextType {
  cartIds: (number | string)[];
  addToCart: (id: number | string) => void;
  removeFromCart: (id: number | string) => void;
  isInCart: (id: number | string) => boolean;

  cartQuantities: Record<string, number>;
  increaseQuantity: (id: number | string) => void;
  decreaseQuantity: (id: number | string) => void;

  clearCart: () => void;
}

// O Provider recebe tudo que estiver dentro dele através de:
export const CartContext = createContext<CartContextType | null>(null);
// cria o meu array do carrinho, e a função para alterar
// a função no useState é para descobrir o valor inicial quando criar o estado

export const CartProvider = ({ children }: CartProviderProps) => {
  const [cartIds, setCartIds] = useState<(number | string)[]>(() => {
    const savedCart = localStorage.getItem('cartIds');

    //json sempre devolve texto, o parse faz: string -> objeto/array
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const [cartQuantities, setCartQuantities] = useState<Record<string, number>>(
    () => {
      const savedQuantities = localStorage.getItem('cartQuantities');

      return savedQuantities ? JSON.parse(savedQuantities) : {};
    },
  );

  useEffect(() => {
    // stringify objeto/array -> string
    localStorage.setItem('cartIds', JSON.stringify(cartIds));
  }, [cartIds]);

  useEffect(() => {
    localStorage.setItem('cartQuantities', JSON.stringify(cartQuantities));
  }, [cartQuantities]);

  const addToCart = (id: number | string) => {
    setCartIds(prev => {
      if (prev.includes(id)) {
        return prev;
      }

      return [...prev, id];
    });
  };

  const removeFromCart = (id: number | string) => {
    setCartIds(prev => prev.filter(cartId => cartId !== id));

    setCartQuantities(prev => {
      const updatedQuantities = { ...prev };

      delete updatedQuantities[id];

      return updatedQuantities;
    });
  };

  const increaseQuantity = (id: number | string) => {
    setCartQuantities(prev => ({
      ...prev,
      [id]: (prev[id] || 1) + 1,
    }));
  };

  const decreaseQuantity = (id: number | string) => {
    setCartQuantities(prev => ({
      ...prev,
      [id]: Math.max(1, (prev[id] || 1) - 1),
    }));
  };

  const isInCart = (id: number | string) => {
    return cartIds.includes(id);
  };

  const clearCart = () => {
    setCartIds([]);
    setCartQuantities({});

    localStorage.removeItem('cartIds');
    localStorage.removeItem('cartQuantities');
  };

  return (
    <CartContext.Provider
      //Tudo que estiver dentro do FavoritesProvider pode acessar tudo isso:
      // const { cartIds, addToCart, removeFromCart, isInCart } = useCart();
      value={{
        cartIds,
        addToCart,
        removeFromCart,
        isInCart,
        cartQuantities,
        increaseQuantity,
        decreaseQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
