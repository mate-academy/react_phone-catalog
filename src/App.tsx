import './App.scss';
import { Routes, Route } from 'react-router-dom';
import { Header } from './Components/Header';
import { Footer } from './Components/Footer';
import { PageNotFound } from './Components/PageNotFound';
import { ProductFilters } from './Components/Filter';

export const App = () => {
  return (
    <main>
      <Header />
      <ProductFilters />

      <Routes>
        <Route path="/" element={<div>Home page</div>} />
        <Route path="/phones" element={<div>Phones page</div>} />
        <Route path="/tablets" element={<div>Tablets page</div>} />
        <Route path="/accessories" element={<div>Accessories page</div>} />
        <Route path="/cart" element={<div>Cart page</div>} />
        <Route path="/favorites" element={<div>Favorites page</div>} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>

      <Footer />
    </main>
  );
};
