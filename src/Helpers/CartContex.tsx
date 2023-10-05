import React, {
  createContext, useContext, useState,
} from 'react';
import { Product } from './Types/Product';

type CartContextType = {
  cart: Product[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  getProductQuantity: (productId: string) => number;
  totalItems: number;
  handleDecrement: (product: Product) => void;
  handleIncrement: (product: Product) => void;
  productQuantities: {
    [productId: string]: number;
  };
  productPrice: (item: Product) => number;
  sum: number;
  setSum: React.Dispatch<React.SetStateAction<number>>;
  buttonStates:{ [key: string]: boolean };
  setButtonStates: React.Dispatch<React.SetStateAction<{
    [key: string]: boolean;
  }>>
};

const CartContext = createContext<CartContextType | undefined>(undefined);

function useLocalStorage(
  key: string,
  initialValue: Product[] |
  {
    [productId: string]: number
  } |
  number,
) {
  const [value, setValue] = useState(() => {
    try {
      const storedValue = localStorage.getItem(key);

      return storedValue ? JSON.parse(storedValue) : initialValue;
    } catch {
      return initialValue;
    }
  });

  const save = (newValue: Product[] |
  {
    [productId: string]: number
  } |
  number) => {
    setValue(newValue);
    localStorage.setItem(key, JSON.stringify(newValue));
  };

  return [value, save];
}

export const CartProvider: React.FC = ({ children }) => {
  const [cart, setCart] = useLocalStorage('cart', []);

  const [productQuantities, setProductQuantities]
    = useLocalStorage('productQuantities', {});

  const totalItems = cart.reduce(
    (total: number, product: Product) => total
      + (productQuantities[product.id] || 0), 0,
  );

  const productPrice = (item: Product) => {
    const quantity = productQuantities[item.id] || 0;

    return quantity * (item.price - item.price * (item.discount / 100));
  };

  const initialSum = cart ? cart.reduce((total: number, item: Product) => {
    return total + productPrice(item);
  }, 0) : 0;

  const [sum, setSum] = useState(initialSum);

  const [buttonStates, setButtonStates]
  = useState<{ [key: string]: boolean }>({});

  const addToCart = (product: Product) => {
    const updatedCart = [...cart];
    const updatedQuantities = { ...productQuantities };

    const existingProductIndex
      = updatedCart.findIndex((item) => item.id === product.id);

    if (existingProductIndex !== -1) {
      updatedQuantities[product.id] += 1;
    } else {
      updatedCart.push(product);
      updatedQuantities[product.id] = 1;
    }

    setCart(updatedCart);
    setProductQuantities(updatedQuantities);
    setSum((prevSum: number) => prevSum + product.price
      - product.price * (product.discount / 100));
  };

  const handleDecrement = (product: Product) => {
    if (productQuantities[product.id] > 0) {
      const updatedQuantity = { ...productQuantities };

      updatedQuantity[product.id] -= 1;
      setProductQuantities(updatedQuantity);
      setSum(
        (prevSum: number) => prevSum - product.price
          + product.price * (product.discount / 100),
      );
    }
  };

  const handleIncrement = (product: Product) => {
    const updatedQuantity = { ...productQuantities };

    updatedQuantity[product.id] = (updatedQuantity[product.id] || 0) + 1;
    setProductQuantities(updatedQuantity);
    setSum((prevSum: number) => prevSum + product.price
      - product.price * (product.discount / 100));
  };

  const removeFromCart = (productId: string) => {
    const updatedCart = cart.filter((item: Product) => item.id !== productId);

    setCart(updatedCart);
  };

  const getProductQuantity = (productId: string) => {
    return productQuantities[productId] || 0;
  };

  return (
    <CartContext.Provider value={
      {
        cart,
        addToCart,
        removeFromCart,
        getProductQuantity,
        totalItems,
        handleDecrement,
        handleIncrement,
        productQuantities,
        productPrice,
        sum,
        setSum,
        buttonStates,
        setButtonStates,
      }
    }
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);

  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }

  return context;
};
