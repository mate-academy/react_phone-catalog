import { Route, Routes, useLocation } from 'react-router-dom';
import './App.scss';
import { useEffect } from 'react';
import { FavoriteContextProvider }
  from './core/context/FavoriteContext/FavoriteContext';
import {
  Header,
  HomePage,
  NotFoundPage,
  PhonePreview,
  PhonesPage,
  ContactsPage,
  Favorite,
  Basket,
  Rights,
  Footer,
}
  from './Components';

export const App = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <FavoriteContextProvider>
      <Header searchValue="" setSearchValue={() => null} />

      <div className="main">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/phones" element={<PhonesPage />} />
          <Route path="/phones/:id" element={<PhonePreview />} />
          <Route
            path="/tablets"
            element={(
              <NotFoundPage
                title="Tables"
                h1="Tablet page under construction"
                text="
              the tablet page is not ready yet, we suggest you return to the"
              />
            )}
          />
          <Route
            path="/accessories"
            element={(
              <NotFoundPage
                title="Accessories"
                h1="Accessories page under construction"
                text="
              accessories page is not ready yet, we suggest you return to the"
              />
            )}
          />
          <Route path="/favorites" element={<Favorite />} />
          <Route path="/cart" element={<Basket />} />
          <Route path="/contacts" element={<ContactsPage />} />
          <Route path="/rights" element={<Rights />} />
          <Route
            path="*"
            element={(
              <NotFoundPage
                title="Page Not Found!"
                h1="Page Not Found!"
                text="sorry, it looks like you got lost,
               we suggest you return to the"
              />
            )}
          />
        </Routes>
      </div>

      <Footer />
    </FavoriteContextProvider>
  );
};
