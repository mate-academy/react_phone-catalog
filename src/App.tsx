import { useEffect, useState } from 'react';
import { Header } from './components/Header';
import { Novelties } from './components/Novelties';
import { Footer } from './components/Footer';
import { HotPrice } from './components/HotPrice';
import { getPhones } from './api';

import './App.scss';
import { Phone } from './types/Phone';
import { NewModels } from './components/NewModels';

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
