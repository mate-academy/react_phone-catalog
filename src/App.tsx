import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import './App.scss';

import { Header } from './components/Header/Header';
import { Footer } from './components/Footer/Footer';

import { Product } from './types/Product';
import { getProducts } from './api/products';
import { Loader } from './components/Loader';
import { GlobalCartProvider } from './components/GlobalCartProvider';
import {
  GlobalFavouritesProvider,
} from './components/GlobalFavouritesProvider';

const App = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const loadProducts = async () => {
    setIsLoading(true);

    try {
      const productsFromServer = await getProducts();

      setProducts(productsFromServer);
    } catch {
      throw new Error('Loading Error');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  return (
    <GlobalFavouritesProvider>
      <GlobalCartProvider>
        <div className="App">
          <Header />

          <main className="App__main">
            {isLoading
              ? (
                <div className="App__loader">
                  <Loader />
                </div>
              )
              : <Outlet context={products} />}
          </main>

          <Footer />
        </div>
      </GlobalCartProvider>
    </GlobalFavouritesProvider>
  );
};

export default App;
