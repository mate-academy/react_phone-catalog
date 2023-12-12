import './App.scss';
import { Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';
import { HomePage } from './pages/HomePage';
import { PhonesPage } from './pages/PhonesPage';
import { TabletsPage } from './pages/TabletsPage';
import { AccessoriesPage } from './pages/AccessoriesPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { Footer } from './components/Footer';
import { Menu } from './components/Menu';
import { FavoritesPage } from './pages/FavoritesPage';
import { ProductsProvider } from './components/ProductsContext';
import { CartPage } from './pages/CartPage';

const App = () => {
  const toggleMenu = () => {
    const appMenu = document.querySelector('.App__menu');

    if (appMenu) {
      appMenu.classList.toggle('App__menu--open');
    }

    document.body.classList.toggle('menu-open');
  };

  return (
    <div className="App">
      <ProductsProvider>
        <Header toggleMenu={toggleMenu} />
        <Menu toggleMenu={toggleMenu} />

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/phones" element={<PhonesPage />} />
          <Route path="/tablets" element={<TabletsPage />} />
          <Route path="/accessories" element={<AccessoriesPage />} />
          <Route path="/favorites" element={<FavoritesPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </ProductsProvider>

      <Footer />
    </div>
  );
};

export default App;
