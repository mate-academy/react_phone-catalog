import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';

import { client } from './utils/fetchClient';

import './App.scss';
import { HomePage } from './Pages/HomePage';
import { ProductDetails } from './Pages/PhoneDetailsPage';
import { TabletsPage } from './Pages/TabletsPage';
import { AccessoriesPage } from './Pages/AccessoriesPage';
import { FavouritesPage } from './Pages/FavouritesPage';
import { ShoppingPage } from './Pages/ShoppingPage';
import { NotFound } from './Pages/NotFoundPage';
import { Phone } from './Type/Phone';
import { Footer } from './Components/Footer/Footer';
import { PhonesPage } from './Pages/PhonsePage/Phones';

export const App = () => {
  const [phones, setPhones] = useState<Phone[]>([]);

  useEffect(() => {
    client.get<Phone[]>('/_new/products.json')
      .then(setPhones);
  }, []);

  return (
    <div className="App">

      <Routes>
        <Route path="/" element={<HomePage phones={phones} />} />

        <Route path="/Phones">
          <Route index element={<PhonesPage phones={phones} />} />
          <Route path=":phoneId" element={<ProductDetails phones={phones} />} />
        </Route>

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
