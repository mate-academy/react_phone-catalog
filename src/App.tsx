import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './modules/HomePage/index';
import { PhonesPage } from './modules/PhonesPage';
import { TabletsPage } from './modules/TabletsPage';
import { AccessoriesPage } from './modules/AccessoriesPage';
import { ProductDetailsPage } from './modules/ProductDetailsPage';
import { FavoritesPage } from './modules/FavoritesPage';
import { NotFoundPage } from './modules/NotFoundPage';
import { CartPage } from './modules/CartPage';
import { Menu } from './components/Menu/Menu';
import './App.scss';

const App = () => {
  return (
    <>
      <header className="header">
        <div className="top-bar">
          <a href="#">
            <img
              src="img/logo-2x.png"
              alt="The Nice Gadgets Logo"
              title="The Nice Gadgets Logo"
              className="top-bar__logo"
            />
          </a>
          <div className="top-bar__menu">
            <Menu />
          </div>

          <div className="top-bar__icons">
            <div className="icon__background">
              <a href="#favourites" className="icon icon--favourites"></a>
            </div>
            <div className="icon__background">
              <a
                href="#shopping-bag-cart"
                className="icon icon--shopping-bag-cart"
              ></a>
            </div>

            <div className="icon__background">
              <a href="#menu" className="icon icon--menu"></a>
            </div>
          </div>
        </div>
        <div className="header__content">
          <div className="header__bottom">
            <div className="header__up">
              <h2 className="header__title">
                <span className="header__title-welcome">
                  Welcome to Nice Gadgets store!
                </span>
              </h2>
            </div>
            <div className="header__down">
              <div className="header__button header__button-slider-left"></div>
              <div className="header__banner"></div>
              <div className="header__button header__button-slider-right"></div>
            </div>
            <div className="header__dots">
              <img
                src="img/dots-2x.png"
                alt="Dots Style"
                className="header__dots"
              />
            </div>
          </div>
        </div>
      </header>

      <aside className="menu page__menu" id="menu">
        <div className="menu__content">
          <div className="top-bar menu__top">
            <a href="#">
              <img
                src="img/logo-2x.png"
                alt="The Nice Gadgets Logo"
                className="top-bar__logo"
              />
            </a>

            <div className="top-bar__icons">
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
