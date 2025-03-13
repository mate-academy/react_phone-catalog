import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import { useProducts } from './ProductsContext';

interface CartProduct {
  id: string;
  quantity: number;
}

interface CartContextType {
  products: CartProduct[];
  addProduct: (productId: string) => void;
  removeProduct: (productId: string) => void;
  increaseQuantity: (productId: string) => void;
  decreaseQuantity: (productId: string) => void;
  totalQuantity: number;
  totalPrice: number;
  isInCart: (productId: string) => boolean;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<CartProduct[]>([]);
  const { phones, tablets, accessories } = useProducts();
  const allProducts = [...phones, ...tablets, ...accessories];

  useEffect(() => {
    const savedProducts = JSON.parse(localStorage.getItem('products') || '[]');

    setProducts(savedProducts);
  }, []);

  const addProduct = (productId: string) => {
    setProducts(prevProducts => {
      const existingProduct = prevProducts.find(p => p.id === productId);

      if (existingProduct) {
        return prevProducts;
      }

      const updatedProducts = [...prevProducts, { id: productId, quantity: 1 }];

      localStorage.setItem('products', JSON.stringify(updatedProducts));

      return updatedProducts;
    });
  };

  const removeProduct = (productId: string) => {
    const updatedProducts = products.filter(
      product => product.id !== productId,
    );

    setProducts(updatedProducts);
    localStorage.setItem('products', JSON.stringify(updatedProducts));
  };

  const increaseQuantity = (productId: string) => {
    setProducts(prev => {
      const updatedProducts = prev.map(p =>
        p.id === productId ? { ...p, quantity: p.quantity + 1 } : p,
      );

      localStorage.setItem('products', JSON.stringify(updatedProducts));

      return updatedProducts;
    });
  };

  const decreaseQuantity = (productId: string) => {
    setProducts(prev => {
      const updatedProducts = prev.map(p =>
        p.id === productId
          ? { ...p, quantity: Math.max(1, p.quantity - 1) }
          : p,
      );

      localStorage.setItem('products', JSON.stringify(updatedProducts));

      return updatedProducts;
    });
  };

  const isInCart = (productId: string) => {
    return products.some(p => p.id === productId);
  };

  const clearCart = () => {
    setProducts([]);
    localStorage.setItem('products', '[]');
  };

  const totalQuantity = products.reduce((acc, p) => acc + p.quantity, 0);
  const totalPrice = products.reduce((acc, p) => {
    const product = allProducts.find(item => item.id === p.id);

    return acc + (product ? product.priceDiscount * p.quantity : 0);
  }, 0);

  return (
    <CartContext.Provider
      value={{
        products,
        addProduct,
        removeProduct,
        increaseQuantity,
        decreaseQuantity,
        totalPrice,
        totalQuantity,
        isInCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }

  return context;
};
