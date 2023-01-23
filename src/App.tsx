import { useEffect, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { getPhones } from './utils/api';
import { Phone } from './types/Phone';
import { Favourites } from './pages/Favourites';

import './App.scss';
import { Withdraw } from './pages/Withdraw';
import { ItemPage } from './pages/ItemPage';
import { CategoryPage } from './pages/CategoryPage';
import { HomePage } from './pages/HomePage';

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
            {products && (
              <>
                <Route path="/" element={<Navigate to="/home" replace />} />

                <Route
                  path="/home"
                  element={<HomePage products={products} />}
                />

                <Route path="/phones">
                  <Route
                    index
                    element={
                      <CategoryPage items={products} category="phone" />
                    }
                  />
                  <Route path=":itemId" element={<ItemPage />} />
                </Route>

                <Route path="/tablets">
                  <Route
                    index
                    element={
                      <CategoryPage items={products} category="tablet" />
                    }
                  />
                  <Route path=":itemId" element={<ItemPage />} />
                </Route>

                <Route path="/accessories">
                  <Route
                    index
                    element={
                      <CategoryPage items={products} category="accessories" />
                    }
                  />
                  <Route path=":itemId" element={<ItemPage />} />
                </Route>
              </>
            )}

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
