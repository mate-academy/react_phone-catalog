import './App.scss';
import { useState } from 'react';

import {
  Routes, Route, Navigate, useSearchParams,
} from 'react-router-dom';

import { Phones } from './Pages/Phones/Phones';
import { Header } from './Components/Header/Header';
import { HomePage } from './Pages/HomePage/HomePage';
import { NotFoundPAge } from './Pages/NotFoundPage/NotFoundPage';
import { Tablets } from './Pages/Tablets/Tablets';
import { Accessories } from './Pages/Accessories/Accessories';
import { Favorites } from './Pages/Favorites/Favorites';
import { Cart } from './Pages/Cart/Cart';
import { Menu } from './Components/Menu/Menu';
import { Footer } from './Components/Footer/Footer';
import { ContactPage } from './Pages/ContactPage/ContactPage';

const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoader, setIsLoader] = useState(false);
  const [searchParams] = useSearchParams();

  return (
    <div className="App" id="#up">
      <Header setIsMenu={setIsMenuOpen} isMenu={isMenuOpen} />

      {isMenuOpen && (
        <Menu setIsMenu={setIsMenuOpen} isMenu={isMenuOpen} />
      )}

      <Routes>
        <Route
          path="/home"
          element={(
            <HomePage
              setIsLoader={setIsLoader}
              isLoader={isLoader}
              searchParams={searchParams}
            />
          )}
        />

        <Route path="/" element={<Navigate to="/home" />} />

        <Route path="phones">
          <Route
            index
            element={(
              <Phones
                isLoader={isLoader}
                setIsLoader={setIsLoader}
              />
            )}
          />

          <Route
            path=":productId"
            element={(
              <Phones
                isLoader={isLoader}
                setIsLoader={setIsLoader}
              />
            )}
          />
        </Route>

        <Route
          path="tablets"
          element={(
            <Tablets
              isLoader={isLoader}
              setIsLoader={setIsLoader}
            />
          )}
        />

        <Route
          path="accessories"
          element={(
            <Accessories
              isLoader={isLoader}
              setIsLoader={setIsLoader}
            />
          )}
        />
        <Route path="favorites" element={<Favorites />} />
        <Route path="cart" element={<Cart />} />
        <Route path="contacts" element={<ContactPage />} />

        <Route path="*" element={<NotFoundPAge />} />
      </Routes>

      <Footer />
    </div>
  );
};

export default App;
