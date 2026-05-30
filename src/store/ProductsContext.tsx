import React, { useEffect, useMemo, useState } from 'react';
import { CartProduct } from 'types/CartIProduct';
import { Product } from 'types/Product';

type ProductsContextType = {
  products: Product[] | null;
  setProducts: React.Dispatch<React.SetStateAction<Product[] | null>>;
  filteredProducts: Product[];
  setFilteredProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  toggleMenu: boolean;
  setToggleMenu: React.Dispatch<React.SetStateAction<boolean>>;
  favouriteAmount: number;
  setFavouriteAmount: React.Dispatch<React.SetStateAction<number>>;
  cartProducts: CartProduct[];
  setCartProducts: React.Dispatch<React.SetStateAction<CartProduct[]>>;
  cartItemsAmount: number;
  setCartItemsAmount: React.Dispatch<React.SetStateAction<number>>;
  cartTotalPrice: number;
  setCartTotalPrice: React.Dispatch<React.SetStateAction<number>>;
  searchProduct: string;
  setSearchProduct: React.Dispatch<React.SetStateAction<string>>;
};

export const ProductsContext = React.createContext<ProductsContextType>({
  products: null,
  setProducts: () => {},
  filteredProducts: [],
  setFilteredProducts: () => {},
  toggleMenu: false,
  setToggleMenu: () => {},
  favouriteAmount: 0,
  setFavouriteAmount: () => {},
  cartProducts: [],
  setCartProducts: () => {},
  cartItemsAmount: 0,
  setCartItemsAmount: () => {},
  cartTotalPrice: 0,
  setCartTotalPrice: () => {},
  searchProduct: '',
  setSearchProduct: () => {},
});

type Props = {
  children: React.ReactNode;
};

export const ProductsProvider: React.FC<Props> = ({ children }) => {
  const [products, setProducts] = useState<Product[] | null>(null);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [toggleMenu, setToggleMenu] = useState(false);
  const [favouriteAmount, setFavouriteAmount] = useState(0);
  const [cartProducts, setCartProducts] = useState<CartProduct[]>([]);
  const [cartItemsAmount, setCartItemsAmount] = useState(0);
  const [cartTotalPrice, setCartTotalPrice] = useState(0);
  const [searchProduct, setSearchProduct] = useState('');

  useEffect(() => {
    const total = cartProducts.reduce(
      (acc, item) => acc + item.price * item.amount,
      0,
    );

    setCartTotalPrice(total);
  }, [cartProducts]);

  const value = useMemo(
    () => ({
      products,
      setProducts,
      filteredProducts,
      setFilteredProducts,
      toggleMenu,
      setToggleMenu,
      favouriteAmount,
      setFavouriteAmount,
      cartProducts,
      setCartProducts,
      cartItemsAmount,
      setCartItemsAmount,
      cartTotalPrice,
      setCartTotalPrice,
      searchProduct,
      setSearchProduct,
    }),
    [
      products,
      filteredProducts,
      toggleMenu,
      favouriteAmount,
      cartProducts,
      cartItemsAmount,
      cartTotalPrice,
      searchProduct,
    ],
  );

  // prettier-ignore
  return (
    <ProductsContext.Provider value={value}>
      {children}
    </ProductsContext.Provider>
  );
};
