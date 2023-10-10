import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';

import './App.scss';
import { HomePage } from './Pages/HomePage';
import { ProductDetails } from './Pages/PhoneDetailsPage';
import { TabletsPage } from './Pages/TabletsPage';
import { AccessoriesPage } from './Pages/AccessoriesPage';
import { FavouritesPage } from './Pages/FavouritesPage';
import { CartPage } from './Pages/CartPage';
import { NotFound } from './Pages/NotFoundPage';
import { Phone } from './Type/Phone';
import { Footer } from './Components/Footer/Footer';
import { PhonesPage } from './Pages/PhonsePage/Phones';
import { getPhones } from './api/phones';
import { Menu } from './Pages/BurgerMenu/Menu';

export const App = () => {
  const [phones, setPhones] = useState<Phone[]>([]);
  const [isLoading, setiSLoading] = useState(true);

  useEffect(() => {
    getPhones()
      .then((phonesFromApi) => {
        setPhones(phonesFromApi);
      })
      .finally(() => setiSLoading(false));
  }, []);

  return (
    <div className="App">

      <Routes>
        <Route
          path="/"
          element={(
            <HomePage phones={phones} isLoading={isLoading} />
          )}
        />

        <Route path="/Phones">
          <Route
            index
            element={(
              <PhonesPage phones={phones} isLoading={isLoading} />)}
          />
          <Route path=":phoneId" element={<ProductDetails phones={phones} />} />
        </Route>

        <Route
          path="/Tablets"
          element={<TabletsPage isLoading={isLoading} />}
        />
        <Route
          path="/Accessories"
          element={<AccessoriesPage isLoading={isLoading} />}
        />
        <Route
          path="/Favourites"
          element={(<FavouritesPage isLoading={isLoading} />)}
        />
        <Route
          path="/Shopping"
          element={(<CartPage isLoading={isLoading} />)}
        />
        <Route
          path="/Menu"
          element={(<Menu isLoading={isLoading} />)}
        />

        <Route path="*" element={<NotFound />} />
      </Routes>

      <Footer />
    </div>
  );
};
