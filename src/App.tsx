/* eslint-disable max-len */
import './App.scss';
import { Route, Routes } from 'react-router-dom';
import { HomePage } from './modules/HomePage/HomePage';
import { CartPage } from './modules/CartPage/CartPage';
import { NavBar } from './modules/NavBar/NavBar';
import { Footer } from './components/Footer/Footer';
import { PhonesPage } from './pages/PhonesPage/PhonesPage';
import { TabletsPage } from './pages/TabletsPage/TabletsPage';
import { AccessoriesPage } from './pages/AccessoriesPage/AccessoriesPage';
import { ProductDetailsPage } from './modules/ProductDetailsPage/ProductDetailsPage';
import { FavouriteProducts } from './pages/FavouritesPage/Favourites';
import { NotFoundPage } from './pages/NotFoundPage/NotFoundPage';

export const App = () => {
  return (
    <div className="layout">
      <header>
        <NavBar />
      </header>
      <main className="layout__content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/phones" element={<PhonesPage />}></Route>
          <Route path="/:phones/:id" element={<ProductDetailsPage />} />
          <Route path="/tablets" element={<TabletsPage />} />
          <Route path="/accessories" element={<AccessoriesPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/favourite" element={<FavouriteProducts />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
};
