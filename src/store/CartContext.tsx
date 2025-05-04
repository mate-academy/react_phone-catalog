import React, { useContext, useEffect, useState } from 'react';
import { Product } from '../types/Product';

interface ShoppingCartContext {
  shoppingCartProducts: Product[];
  addToCart: (product: Product) => void;
  deleteFromCart: (productID: string) => void;
  clearCart: () => void;
  productQuantities: { [key: string]: number };
  handleQuantity: (productID: string, type: string) => void;
  totalQuantity: number;
}

export const CartContext = React.createContext<ShoppingCartContext>({
  shoppingCartProducts: [] as Product[],
  addToCart: () => {},
  deleteFromCart: () => {},
  clearCart: () => {},
  productQuantities: {},
  handleQuantity: () => {},
  totalQuantity: 0,
});

type Props = {
  children: React.ReactNode;
};

export const CartProvider: React.FC<Props> = ({ children }) => {
  const storedCartItems = localStorage.getItem('cartProducts');
  const cartProducts = storedCartItems ? JSON.parse(storedCartItems) : [];

  const storedProductQuantities = localStorage.getItem('productQuantities');
  const initialQuantities = storedProductQuantities
    ? JSON.parse(storedProductQuantities)
    : {};

  const [shoppingCartProducts, setShoppingCartProducts] =
    useState<Product[]>(cartProducts);

  const [productQuantities, setProductQuantities] = useState(initialQuantities);

  useEffect(() => {
    localStorage.setItem(
      'productQuantities',
      JSON.stringify(productQuantities),
    );
  }, [productQuantities]);

  const updateCartProducts = (data: Product[]) => {
    setShoppingCartProducts(data);

    localStorage.setItem('cartProducts', JSON.stringify(data));
  };

  const addToCart = (product: Product) => {
    updateCartProducts([...shoppingCartProducts, product]);

    const addQuantity = {
      ...productQuantities,
      [product.itemId]: 1,
    };

    setProductQuantities(addQuantity);
  };

  const deleteFromCart = (productId: string) => {
    const updatedCart = shoppingCartProducts.filter(
      (item: Product) => item.itemId !== productId,
    );

    const { [productId]: deleted, ...updatedQuantities } = productQuantities;

    setProductQuantities(updatedQuantities);

    updateCartProducts(updatedCart);
  };

  const clearCart = () => {
    localStorage.clear();
    setProductQuantities('');
    setShoppingCartProducts([]);
  };

  const handleQuantity = (productId: string, type: string) => {
    const currentQuantity = productQuantities[productId];
    const newQuantity =
      type === 'plus' ? currentQuantity + 1 : currentQuantity - 1;

    const updatedQuantities = {
      ...productQuantities,
      [productId]: newQuantity,
    };

    setProductQuantities(updatedQuantities);
  };

  let totalQuantity = 0;

  for (const key in productQuantities) {
    totalQuantity += productQuantities[key];
  }

  const value = {
    shoppingCartProducts,
    addToCart,
    deleteFromCart,
    clearCart,
    productQuantities,
    handleQuantity,
    totalQuantity,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useShoppingCart = () => useContext(CartContext);
