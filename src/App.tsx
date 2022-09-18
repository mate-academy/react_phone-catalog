import { useEffect, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Header } from './components/Header';
import { Novelties } from './components/Novelties';
import { Footer } from './components/Footer';
import { HotPrice } from './components/HotPrice';
import { getPhones } from './utils/api';
import { Phone } from './types/Phone';
import { NewModels } from './components/NewModels';
import { Category } from './components/Category';
import { Favourites } from './components/Favourites';

import './App.scss';
import { Withdraw } from './components/Withdraw';
import { ItemPage } from './components/ItemPage';

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
          <Routes>
            <Route path="/" element={<Navigate to="/home" replace />} />

            <Route
              path="/home"
              element={(
                <>
                  <Novelties />
                  {products && (
                    <>
                      <HotPrice
                        products={products}
                      />
                      <Category />
                      <NewModels
                        products={products}
                      />
                    </>
                  )}
                </>
              )}
            />

            <Route path="/phones">
              <Route index element={<p>Wow</p>} />
              <Route path=":itemId" element={<ItemPage />} />
            </Route>

            <Route
              path="/favourites"
              element={<Favourites />}
            />

            <Route
              path="/withdraw"
              element={<Withdraw />}
            />

            <Route path="*" element={<p>Page not found</p>} />

          </Routes>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default App;
