import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';

import { client } from './utils/fetchClient';

import './App.scss';
import { Navigation } from './Components/Navigation';
import { HomePage } from './Pages/Home';
import { NotFound } from './Pages/NotFound';
import { PhonesPage } from './Pages/Phones';
import { TabletsPage } from './Pages/Tablets';
import { AccessoriesPage } from './Pages/Accessories';
import { FavouritesPage } from './Pages/Favourites';
import { ShoppingPage } from './Pages/Shopping';
import { Footer } from './Components/Footer';
import { Phone } from './Type/Phone';

export const App = () => {
  const [phones, setPhones] = useState<Phone[]>([]);

  useEffect(() => {
    client.get<Phone[]>('/_new/products.json')
      .then(setPhones);
  }, []);

  return (
    <div className="App">
      <Navigation />

      <Routes>
        <Route path="/" element={<HomePage phones={phones} />} />

        <Route path="/Phones" element={<PhonesPage phones={phones} />} />
        <Route path="/Tablets" element={<TabletsPage />} />
        <Route path="/Accessories" element={<AccessoriesPage />} />
        <Route path="/Favourites" element={<FavouritesPage />} />
        <Route path="/Shopping" element={<ShoppingPage />} />

        <Route path="*" element={<NotFound />} />
      </Routes>

      <Footer />
    </div>
  );
};
