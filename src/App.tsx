import { Route, Routes } from 'react-router-dom';
import { useState } from 'react';

import './App.scss';
import { HomePage } from './pages/HomePage';
import { PhonesPage } from './pages/products/PhonesPage';
import { TabletsPage } from './pages/products/TabletsPage';
import { AccessoriesPage } from './pages/products/AccessoriesPage';
import { FavoritesPage } from './pages/FavoritesPage';
import {
  ACCESSORIES_LINK,
  CART_LINK,
  FAVORITES_LINK,
  HOME_LINK,
  PHONES_LINK,
  PRODUCT_LINK,
  TABLETS_LINK,
} from './helpers/constants/Links';
import { CartPage } from './pages/CartPage';
import { ProductDetailsPage } from './pages/ProductDetailsPage';
import { NotFoundPage } from './pages/NofFoundPage';
import { DropDownMenu } from './components/DropDownMenu';
import { DropDownMenuContext } from './helpers/context/DropDownMenuContext';
import { Footer } from './components/footer/Footer';

const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const productFullLink = `${PRODUCT_LINK}/:productId`;

  const collapseMenu = () => setIsMenuOpen(false);

  const expandMenu = () => setIsMenuOpen(true);

  return (
    <div className="app">
      <DropDownMenuContext.Provider value={{ collapseMenu, expandMenu }}>
        <Routes>
          <Route
            path={HOME_LINK}
            element={isMenuOpen ? <DropDownMenu /> : (
              <div className="app__content">
                <HomePage />

                <Footer />
              </div>
            )}
          />

          <Route
            path={PHONES_LINK}
            element={isMenuOpen ? <DropDownMenu /> : (
              <div className="app__content">
                <PhonesPage />

                <Footer />
              </div>
            )}
          />

          <Route
            path={TABLETS_LINK}
            element={isMenuOpen ? <DropDownMenu /> : (
              <div className="app__content">
                <TabletsPage />

                <Footer />
              </div>
            )}
          />

          <Route
            path={ACCESSORIES_LINK}
            element={isMenuOpen ? <DropDownMenu /> : (
              <div className="app__content">
                <AccessoriesPage />

                <Footer />
              </div>
            )}
          />

          <Route
            path={FAVORITES_LINK}
            element={isMenuOpen ? <DropDownMenu /> : (
              <div className="app__content">
                <FavoritesPage />

                <Footer />
              </div>
            )}
          />

          <Route
            path={CART_LINK}
            element={isMenuOpen ? <DropDownMenu /> : (
              <div className="app__content">
                <CartPage />

                <Footer hasTopNav={false} />
              </div>
            )}
          />

          <Route
            path={productFullLink}
            element={isMenuOpen ? <DropDownMenu /> : (
              <div className="app__content">
                <ProductDetailsPage />

                <Footer />
              </div>
            )}
          />

          <Route path="/*" element={<NotFoundPage />} />
        </Routes>
      </DropDownMenuContext.Provider>
    </div>
  );
};

export default App;
