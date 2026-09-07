import './App.scss';
import Footer from './components/footer/Footer';
import Header from './components/header/Header';
import HomePage from './pages/HomePage';
import ProductPage from './pages/ProductPage';
import FavouritesPage from './pages/FavouritesPage';
import CartPage from './pages/CartPage';
import { Route, Routes } from 'react-router-dom';
import CategoryPage from './pages/CategoryPage';
import NotFoundPage from './pages/NotFoundPage';

export const App = () => {
  return (
    <div
      className="App max-w-[100vw] flex flex-col 
    justify-between min-h-screen font-mont"
    >
      <Header />
      <div
        className="flex flex-col pb-20  w-full 
      h-full flex-grow max-w-screen-xl mx-auto"
      >
        <Routes>
          <Route path="/">
            <Route index element={<HomePage />} />
          </Route>
          <Route path=":category">
            <Route index element={<CategoryPage />} />
            <Route path=":id" element={<ProductPage />} />
          </Route>

          <Route path="/favourites" element={<FavouritesPage />} />
          <Route path="/cart" element={<CartPage />} />

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
};
