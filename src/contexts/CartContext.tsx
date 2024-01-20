import React from 'react';
import { Product } from '../types/Product';
import { useLocalStorage } from '../helpers/useLocalStorage';

interface State {
  unique: Product[],
  cart: Product[],
  setCart: (products: Product[]) => void,
  handleAddToCart: (product: Product) => void,
  getNumberOfCopies: (id: string) => number,
  deleteById: (id: string) => void,
  addCopy: (product: Product) => void,
  deleteCopy: (id: string) => void,
  deleteAll: () => void,
}

export const CartContext = React.createContext<State>({
  unique: [],
  cart: [],
  setCart: () => {},
  handleAddToCart: () => {},
  getNumberOfCopies: () => 0,
  deleteById: () => {},
  addCopy: () => {},
  deleteCopy: () => {},
  deleteAll: () => {},
});

interface Props {
  children: React.ReactNode;
}

export const CartProvider: React.FC<Props> = ({ children }) => {
  const [cart, setCart] = useLocalStorage<Product[]>('cart', []);

  const handleAddToCart = (product: Product) => {
    if (cart.some(fav => fav.id === product.id)) {
      setCart((currentCart: Product[]) => (
        currentCart.filter(p => p.id !== product.id)
      ));
    } else {
      setCart((currentCart: Product[]) => [...currentCart, product]);
    }
  };

  const isUnique = (value: Product, index: number, self: Product[]) => {
    return self.findIndex(obj => obj.id === value.id) === index;
  };

  const getNumberOfCopies = (id: string) => {
    let count = 0;

    cart.forEach(p => {
      if (p.id === id) {
        count += 1;
      }
    });

    return count;
  };

  const unique = cart.filter(isUnique);

  const deleteById = (id: string) => {
    setCart(prevState => prevState.filter(p => p.id !== id));
  };

  const addCopy = (product: Product) => {
    setCart(prevState => [...prevState, product]);
  };

  const deleteCopy = (id: string) => {
    const reversedIndex = [...cart].reverse().findIndex(p => p.id === id);
    const lastIndex = reversedIndex !== -1
      ? cart.length - 1 - reversedIndex
      : -1;

    setCart(prevState => [
      ...prevState.slice(0, lastIndex), ...prevState.slice(lastIndex + 1),
    ]);
  };

  const deleteAll = () => {
    setCart([]);
  };

  const value: State = {
    cart,
    setCart,
    unique,
    handleAddToCart,
    getNumberOfCopies,
    deleteById,
    addCopy,
    deleteCopy,
    deleteAll,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};
