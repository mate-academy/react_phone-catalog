import './App.scss';
import { useState, useEffect } from 'react';
import { Footer } from './components/Footer/Footer';
import { Header } from './components/Header/Header/Header';
import { Product } from './types/types';
import { CreatedRoutes } from './Routes';

const App = () => {
  const [IPhones, setIPhones] = useState<Product[]>([]);
  const [visibleIPhones, setVisibleIPhones] = useState<Product[]>(IPhones);
  const [searchInput, setSearchInput] = useState('');
  const [isError, setIsError] = useState(false);

  const getIPhones = async () => {
    try {
      const response = await fetch('new/products.json');

      if (response.status === 200) {
        const result = await response.json();

        setIPhones(result);
        setVisibleIPhones(result);
        setIsError(false);
      }
    } catch (err) {
      setIsError(true);
      throw new Error('Error');
    }
  };

  useEffect(() => {
    getIPhones();
  }, []);

  return (
    <>
      <Header
        setVisibleIPhones={setVisibleIPhones}
        IPhones={IPhones}
        searchInput={searchInput}
        setSearchInput={setSearchInput}
      />
      <CreatedRoutes
        IPhones={IPhones}
        visibleIPhones={visibleIPhones}
        isError={isError}
        setIPhones={setIPhones}
        setVisibleIPhones={setVisibleIPhones}
        searchInput={searchInput}
      />
      <footer>
        <Footer />
      </footer>
    </>
  );
};

export default App;
