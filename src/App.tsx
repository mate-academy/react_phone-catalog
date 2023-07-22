import { Route, Routes, useLocation } from 'react-router-dom';
import './App.scss';
import { useEffect } from 'react';
// import { Product } from './Components/ProductCards/Product';
import { FavoriteContextProvider } from './FavoriteContext';
import { HomePAge } from './Components/Pages/HomePage/HomePage';
import { Header } from './Components/Header/Header';
import { NotFoundPage } from './Components/Pages/NotFoundPage/NotFoundPage';
import { PhonesPage } from './Components/Pages/PhonesPage/PhonesPage';
import { PhonePreview } from './Components/Pages/PhonePreview';
import { ContactsPage } from './Components/Pages/Contacts/Contacts';
import { Favorite } from './Components/Pages/Favorite/Favorite';
import { Basket } from './Components/Pages/Basket/Basket';
import { Rights } from './Components/Pages/Rights/Rights';
import { Footer } from './Components/Footer/Footer';
// import { BlockBasket } from './Components/Pages/Basket/BlockBasket';

export const App = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <>
      <FavoriteContextProvider>
        <Header searchValue="" setSearchValue={() => null} />

        <div className="main">
          <Routes>
            <Route path="/" element={<HomePAge />} />
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
            {/* <Route
              path="/basketBlock"
              element={(
                <BlockBasket
                  product={product}
                />
              )}
            /> */}
            <Route path="/favorite" element={<Favorite />} />
            <Route path="/basket" element={<Basket />} />
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
    </>
  );
};
