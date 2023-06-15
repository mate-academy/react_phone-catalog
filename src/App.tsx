import './App.scss';

import { Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getPhones } from './api/api';
import { Product } from './types/Product';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { NotPage } from './pages/NotPage';
import { HomePage } from './pages/HomePage';
import { PhonesPage } from './pages/PhonesPage';
import { TabletsPage } from './pages/TabletsPage';
import { AccessoriesPage } from './pages/Accessories';
import { ProductDetailsPage } from './pages/ProductDetailsPage';
import { FavouritesPage } from './pages/FavouritesPage';
import { CartPage } from './pages/CartPage';

export const App: React.FC = () => {
  const [phones, setPhones] = useState<Product[]>([]);

  const getPhonesFromServer = async () => {
    try {
      const phonesFromServer = await getPhones();

      setPhones(phonesFromServer);
    } catch {
      throw new Error('Unable to upload phones');
    }
  };

  useEffect(() => {
    getPhonesFromServer();
  }, []);

  return (
    <>
      <div className="page">
        <Header />

        <main className="page__content">
          <Routes>
            <Route
              path="*"
              element={<NotPage />}
            />
            <Route path="/" element={<HomePage products={phones} />} />
            <Route path="/home" element={<Navigate to="/" replace />} />
            <Route path="/phones">
              <Route index element={<PhonesPage phones={phones} />} />
              <Route path=":productId" element={<ProductDetailsPage phones={phones} />} />
            </Route>
            <Route path="tablets" element={<TabletsPage tablets={[]} />} />
            <Route path="accessories" element={<AccessoriesPage accessories={[]} />} />
            <Route path="favourites" element={<FavouritesPage />} />
            <Route path="cart" element={<CartPage />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </>
  );
};
