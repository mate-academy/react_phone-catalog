import { useEffect, useState } from 'react';
import { Header } from './components/Header';
import { Novelties } from './components/Novelties';
import { Footer } from './components/Footer';
import { HotPrice } from './components/HotPrice';
import { getPhones } from './api';
import { Phone } from './types/Phone';
import { NewModels } from './components/NewModels';
import { Category } from './components/Category';

import './App.scss';

const App = () => {
  const [products, setProducts] = useState<Phone[]>();

  useEffect(() => {
    getPhones().then((phones: Phone[]) => setProducts(phones));
  }, []);

  return (
    <>
      <Header />
      <main className="main">
        <div className="container">
          <Novelties />
          {products && (
            <>
              <HotPrice products={products} />
              <Category />
              <NewModels products={products} />
            </>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
};

export default App;
