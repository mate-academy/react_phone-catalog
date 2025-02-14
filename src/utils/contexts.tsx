import React, { createContext, useState, useEffect } from 'react';
import { ProductDetails } from '../Types/productDetails';
import { Product } from '../Types/products';

interface FavoritesContextType {
  favorites: Product[];
  setFavorites: React.Dispatch<React.SetStateAction<Product[]>>;
}
interface CartContextType {
  cart: Product[];
  setCart: React.Dispatch<React.SetStateAction<Product[]>>;
}

export const PhoneContext = createContext<ProductDetails[]>([]);
export const TabletContext = createContext<ProductDetails[]>([]);
export const AccessoriesContext = createContext<ProductDetails[]>([]);
export const FavoritesContext = createContext<FavoritesContextType | null>(
  null,
);
export const CartContext = createContext<CartContextType | null>(null);
export const ProductContext = createContext<Product[]>([]);

export const ContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [phones, setPhones] = useState<ProductDetails[]>([]);
  const [tablets, setTablets] = useState<ProductDetails[]>([]);
  const [accessories, setAccessories] = useState<ProductDetails[]>([]);
  const [products, setProducts] = useState<Product[]>([]);

  const [favorites, setFavorites] = useState<Product[]>(() => {
    const savedFavorites = localStorage.getItem('favorites');

    return savedFavorites ? JSON.parse(savedFavorites) : [];
  });
  const [cart, setCart] = useState<Product[]>(() => {
    const savedCart = localStorage.getItem('cart');

    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    async function fetchData() {
      try {
        const [phonesData, tabletsData, accessoriesData, productsData] =
          await Promise.all([
            fetch('/api/phones.json').then(res => res.json()),
            fetch('/api/tablets.json').then(res => res.json()),
            fetch('/api/accessories.json').then(res => res.json()),
            fetch('/api/products.json').then(res => res.json()),
          ]);

        setPhones(phonesData);
        setTablets(tabletsData);
        setAccessories(accessoriesData);
        setProducts(productsData);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('data loading error', error);
      }
    }

    fetchData();
  }, []);

  return (
    <PhoneContext.Provider value={phones}>
      <TabletContext.Provider value={tablets}>
        <AccessoriesContext.Provider value={accessories}>
          <ProductContext.Provider value={products}>
            <FavoritesContext.Provider value={{ favorites, setFavorites }}>
              <CartContext.Provider value={{ cart, setCart }}>
                {children}
              </CartContext.Provider>
            </FavoritesContext.Provider>
          </ProductContext.Provider>
        </AccessoriesContext.Provider>
      </TabletContext.Provider>
    </PhoneContext.Provider>
  );
};
