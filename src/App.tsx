import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Product } from './types/Product';
import { getProducts } from './helpers/fetchClient';

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
    <div className="App">
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default App;
