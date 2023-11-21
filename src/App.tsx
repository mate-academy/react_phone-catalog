import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';

import './App.scss';
import { HomePage } from './pages/HomePage/Home';
import { ProductDetails } from './pages/PhoneDetailPage/PhoneDetail';
import { TabletsPage } from './pages/TablesPAge/Tablets';
import { AccessoriesPage } from './pages/AccsessoriesPage/AccsessoriesPage';
import { FavouritesPage } from './pages/FavouritesPage/Favourites';
import { CartPage } from './pages/CartPage/Cart';
import { NotFound } from './pages/NotFoundPage/NotFound';
import { Phone } from './types/Phone';
import { Footer } from './components/Footer/Footer';
import { PhonesPage } from './pages/PhonesPage/Phones';
import { getPhones } from './utils/phone';
import { Menu } from './pages/BurgerMenu/Menu';

export const App = () => {
  const [phones, setPhones] = useState<Phone[]>([]);
  const [isLoading, setISLoading] = useState(true);

  useEffect(() => {
    getPhones()
      .then(phonesFromApi => {
        setPhones(phonesFromApi);
      })
      .finally(() => setISLoading(false));
  }, []);

  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={(
            <HomePage
              phones={phones}
              isLoading={isLoading}
            />
          )}
        />

        <Route path="/Phones">
          <Route
            index
            element={(
              <PhonesPage
                phones={phones}
                isLoading={isLoading}
              />
            )}
          />
          <Route
            path=":phoneId"
            element={<ProductDetails phones={phones} />}
          />
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
          element={<FavouritesPage isLoading={isLoading} />}
        />
        <Route
          path="/Shopping"
          element={<CartPage isLoading={isLoading} />}
        />
        <Route
          path="/Menu"
          element={<Menu isLoading={isLoading} />}
        />

        <Route
          path="*"
          element={<NotFound />}
        />
      </Routes>

      <Footer />
    </div>
  );
};
