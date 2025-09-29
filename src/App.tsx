/* eslint-disable max-len */
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.scss';
import { Header } from './components/Header';
import { HomePage } from './modules/HomePage/HomePage';
import { Catalog } from './modules/Catalog/Catalog';
// eslint-disable-next-line max-len
import { ProductDetailsPage } from './modules/ProductDetails/ProductDetailsPage';
import Footer from './components/Footer';
import { FavoritesProvider } from './modules/Favorites/context/FavoritesContext';
import { Favorites } from './modules/Favorites/Favorites';

export const App: React.FC = () => {
  return (
    <FavoritesProvider>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />}></Route>
          <Route path="/phones" element={<Catalog type={'phones'} />}></Route>
          <Route path="/tablets" element={<Catalog type={'tablets'} />}></Route>
          <Route
            path="/accessories"
            element={<Catalog type={'accessories'} />}
          ></Route>
          <Route path="/favorites" element={<Favorites />} />
          <Route
            path="/:category/:productId"
            element={<ProductDetailsPage />}
          />
        </Routes>
        <Footer />
      </BrowserRouter>
    </FavoritesProvider>
  );
};
