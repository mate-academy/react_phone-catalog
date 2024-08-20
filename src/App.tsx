import { Navigate, Route, Routes } from 'react-router-dom';
import './App.scss';

import { CatalogProvider } from './components/Contexts/CatalogContext';
import { Header } from './components/Header/Header';
import { HomePage } from './components/HomePage';
import { Footer } from './components/Footer';
import { NotFoundPage } from './components/NotFoundPage';
import { ProductPage } from './components/ProductPage';
import { DetailsPage } from './components/DetailsPage';
import { CartPage } from './components/CartPage';
import { FavouritesPage } from './components/FavouritesPage';
import { ContactsPage } from './components/ContactsPage';
import { RightsPage } from './components/RightsPage';

export const App = () => {
  return (
    <CatalogProvider>
      <div className="App page__app">
        <Header />

        <Routes>
          <Route path="" element={<HomePage />} />
          <Route path="home" element={<Navigate to="/" replace />} />
          <Route path="/phones" element={<ProductPage category={'Phones'} />} />
          <Route path="/phones/:productId" element={<DetailsPage />} />

          <Route
            path="tablets"
            element={<ProductPage category={'Tablets'} />}
          />
          <Route path="tablets/:productId?" element={<DetailsPage />} />

          <Route
            path="accessories"
            element={<ProductPage category={'Accessories'} />}
          />
          <Route path="accessories/:productId?" element={<DetailsPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/favourites" element={<FavouritesPage />} />
          <Route path="/contacts" element={<ContactsPage />} />
          <Route path="/rights" element={<RightsPage />} />

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
      <Footer />
    </CatalogProvider>
  );
};
