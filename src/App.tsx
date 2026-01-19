import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './modules/HomePage/index';
import { PhonesPage } from './modules/PhonesPage';
import { TabletsPage } from './modules/TabletsPage';
import { AccessoriesPage } from './modules/AccessoriesPage';
import { ProductDetailsPage } from './modules/ProductDetailsPage';
import { FavoritesPage } from './modules/FavoritesPage';
import { NotFoundPage } from './modules/NotFoundPage';
import { CartPage } from './modules/CartPage';
import Menu from './components/Menu/index';
import Header from './components/Header';
import './App.scss';

const App = () => {
  return (
    <>
      <Header />

      <aside className="menu page__menu" id="menu">
        <div className="menu__content">
          <div className="topBar menu__top">
            <a href="#">
              <picture>
                <source
                  srcSet="img/logo-desktop.svg"
                  media="(min-width: 1024px)"
                />
                <source
                  srcSet="img/logo-tablet.svg"
                  media="(min-width: 576px)"
                />
                <img
                  src="img/logo-mobile.svg"
                  alt="The Nice Gadgets Logo"
                  title="The Nice Gadgets Logo"
                  className="topBar__logo"
                />
              </picture>
            </a>

            <div className="topBar__icons">
              <a href="#" className="icon icon--close"></a>
            </div>
          </div>

          <div className="menu__bottom">
            <Menu />
          </div>
        </div>
      </aside>
      <main className="main">
        <div className="main__content">
          <Router>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/phones" element={<PhonesPage />} />
              <Route path="/tablets" element={<TabletsPage />} />
              <Route path="/accessories" element={<AccessoriesPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/favorites" element={<FavoritesPage />} />
              <Route
                path="/product/:productId"
                element={<ProductDetailsPage />}
              />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </Router>
        </div>
      </main>
      <footer className="footer"> footer & footer</footer>
    </>
  );
};

export default App;
