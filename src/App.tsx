import React, { useEffect, useState } from 'react';
import { NavBar } from './components/NavBar/NavBar';
import './App.scss';
import { Footer } from './components/Footer/Footer';
import { HomePage } from './pages/HomePage/HomePage';
import { Phone } from './types/Phone';
import { getProducts } from './api';

const App: React.FC = () => {
  const [products, setProducts] = useState<Phone[]>([]);

  const loadProducts = async () => {
    try {
      const productsFromServer = await getProducts();

      setProducts(productsFromServer);
    } catch {
      throw new Error('Loading products error');
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  return (
    <div className="App">
      <NavBar />
      <HomePage products={products} />
      <Footer />
    </div>
  );
};

export default App;
