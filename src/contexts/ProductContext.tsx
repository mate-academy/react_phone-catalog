import { createContext, useEffect, useState } from 'react';
import { Product } from '../types/product';
import { getProducts } from '../api/products';

type ProductsType = {
  products: Product[],
  setProducts: (product: Product[]) => void,
  favouriteProducts: Product[],
  setFavouriteProducts: (product: Product[]) => void,
  cartProducts: Product[],
  setCartProducts: (Product: Product[]) => void,
  productPrice: number,
  setProductPrice: (priceUpdater: (prevPrice: number) => number) => void;

};

type Props = {
  children: React.ReactNode,
};

export const ProductContext = createContext<ProductsType>({
  products: [],
  setProducts: () => {},
  favouriteProducts: [],
  setFavouriteProducts: () => {},
  cartProducts: [],
  setCartProducts: () => {},
  productPrice: 0,
  setProductPrice: () => {},
});

export const ProductProvider: React.FC<Props> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);

  const [favouriteProducts, setFavouriteProducts] = useState<Product[]>([]);

  const [cartProducts, setCartProducts] = useState<Product[]>([]);

  const [productPrice, setProductPrice] = useState<number>(0);

  useEffect(() => {
    getProducts().then((response) => {
      setProducts(response);
    });
  }, []);

  return (
    <ProductContext.Provider
      value={{
        products,
        setProducts,
        favouriteProducts,
        setFavouriteProducts,
        cartProducts,
        setCartProducts,
        productPrice,
        setProductPrice,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};
