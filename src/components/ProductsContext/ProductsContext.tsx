import { createContext, useState, useEffect } from 'react';
import { Product } from '../../Types/Product';

export const ProductsContext = createContext<ProductsContextType>({
  favoriteProducts: [],
  toggleFavorite: () => {},
  cartProducts: [],
  toggleCart: () => {},
  changeCountOfProducts: () => {},
  curtSum: () => 0,
  countOfItems: () => 0,
});

type Props = {
  children: React.ReactNode;
};

type ProductsContextType = {
  favoriteProducts: Product[];
  toggleFavorite: (product: Product) => void;
  cartProducts: Product[];
  toggleCart: (product: Product) => void;
  changeCountOfProducts: (product: Product, count: number) => void;
  curtSum: (products: Product[]) => number;
  countOfItems: (products: Product[]) => number;
};

export const ProductsProvider: React.FC<Props> = ({ children }) => {
  const [favoriteProducts, setFavoriteProducts] = useState<Product[]>(() => {
    // Initialize from localStorage or return an empty array if no data found
    const favorites = JSON.parse(localStorage.getItem('products') || '[]');

    return favorites;
  });

  const [cartProducts, setCartProducts] = useState<Product[]>(() => {
    // Initialize from localStorage or return an empty array if no data found
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');

    return cart;
  });

  const toggleCart = (product: Product) => {
    setCartProducts(prevCart => {
      const isProductInCart = prevCart.some(
        cart => cart.itemId === product.itemId,
      );

      if (isProductInCart) {
        // Remove product from cart
        return prevCart.filter(cart => cart.itemId !== product.itemId);
      }

      const updatedProduct = { ...product, quantity: 1 };

      return [...prevCart, updatedProduct];
    });
  };

  const changeCountOfProducts = (product: Product, quantity: number) => {
    setCartProducts(prevCart => {
      const newCart = prevCart.map(cart => {
        if (cart.itemId === product.itemId) {
          return { ...cart, quantity };
        }

        return cart;
      });

      return newCart;
    });
  };

  const curtSum = (products = cartProducts) => {
    return products.reduce(
      (acc, product) => acc + product.price * product.quantity,
      0,
    );
  };

  const countOfItems = (products = cartProducts) => {
    return products.reduce((acc, product) => acc + product.quantity, 0);
  };

  const toggleFavorite = (product: Product) => {
    setFavoriteProducts(prevFavorites => {
      const isProductInFavorites = prevFavorites.some(
        favorite => favorite.itemId === product.itemId,
      );

      if (isProductInFavorites) {
        // Remove product from favorites
        return prevFavorites.filter(
          favorite => favorite.itemId !== product.itemId,
        );
      }

      return [...prevFavorites, product];
    });
  };

  // Update localStorage whenever favoriteProducts or cartProducts change
  useEffect(() => {
    localStorage.setItem('products', JSON.stringify(favoriteProducts));
    localStorage.setItem('cart', JSON.stringify(cartProducts));
  }, [favoriteProducts, cartProducts]);

  return (
    <ProductsContext.Provider
      value={{
        favoriteProducts,
        toggleFavorite,
        cartProducts,
        toggleCart,
        changeCountOfProducts,
        curtSum,
        countOfItems,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};
