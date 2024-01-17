import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { FavouritesProvider } from './context/FavouritesProvider';
import { SearchProvider } from './context/SearchContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Product } from './types/Product';
import { getProducts } from './helpers/fetchClient';
import { CartProvider } from './context/CartProvider';

import './App.scss';

const App = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  /* eslint-disable no-console */
  console.log(products, isLoading);

  const fetchProducts = async () => {
    setIsLoading(true);

    try {
      const productsFromServer = await getProducts() as Product[];

      localStorage.setItem('products', JSON.stringify(productsFromServer));

      setProducts(productsFromServer);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const storedProducts = localStorage.getItem('products');

    if (storedProducts) {
      setProducts(JSON.parse(storedProducts));
    } else {
      fetchProducts();
    }
  }, []);

  return (
    <CartProvider>
      <FavouritesProvider>
        <SearchProvider>
          <>
            <Header />
            <main>
              <Outlet />
            </main>
            <Footer />
          </>
        </SearchProvider>
      </FavouritesProvider>
    </CartProvider>
  );
};

export default App;
