import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './modules/HomePage/index';
import { PhonesPage } from './modules/PhonesPage';
import { TabletsPage } from './modules/TabletsPage';
import { AccessoriesPage } from './modules/AccessoriesPage';
import { ProductDetailsPage } from './modules/ProductDetailsPage';
import { FavoritesPage } from './modules/FavoritesPage';
import { NotFoundPage } from './modules/NotFoundPage';
import { CartPage } from './modules/CartPage';

const App = () => {
  return (
    <>
      <header className="header">
        <div className="header__content">
          <div className="top-bar">
            <a href="#">
              <img
                src="images/logo-2x.png"
                alt="The Nice Gadgets Logo"
                className="top-bar__logo"
              />
            </a>

            <div className="top-bar__icons">
              <a href="#menu" className="icon icon--menu"></a>
            </div>
          </div>

          <div className="header__bottom">
            <h2 className="header__title">Welcome to Nice Gadgets store!</h2>
          </div>
        </div>
      </header>
      <aside className="menu page__menu" id="menu">
        <div className="menu__content">
          <div className="top-bar menu__top">
            <a href="#">
              <img
                src="images/logo-2x.png"
                alt="The Nice Gadgets Logo"
                className="top-bar__logo"
              />
            </a>

            <div className="top-bar__icons">
              <a href="#" className="icon icon--close"></a>
            </div>
          </div>

          <div className="menu__bottom">
            <nav className="nav menu__nav">
              <ul className="nav__list">
                <li className="nav__item">
                  <a href="#" className="nav__link">
                    Home
                  </a>
                </li>
                <li className="nav__item">
                  <a href="#phones" className="nav__link">
                    Phones
                  </a>
                </li>
                <li className="nav__item">
                  <a href="#tablets" className="nav__link">
                    tablets
                  </a>
                </li>
                <li className="nav__item">
                  <a href="#accessories" className="nav__link">
                    accessories
                  </a>
                </li>
              </ul>
            </nav>
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
      <footer className="footer"></footer>
    </>
  );
};

export default App;
