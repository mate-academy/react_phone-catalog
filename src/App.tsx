import { Navigate, Route, Routes } from 'react-router-dom';
import './App.scss';
import { Footer } from './components/Footer';

import { Header } from './components/Header';
import { HomePage } from './pages/HomePage';
import { PhonesPage } from './pages/PhonesPage';
import { ProductDetailsPage } from './pages/ProductDetailsPage';
import { FavAndCartProvider } from './components/context/FavAndCartContext';
import { FavouritesPage } from './pages/FavouritesPage';
import { CartPage } from './pages/CartPage';
import { TabletsPage } from './pages/TabletsPage';
import { AccessoriesPage } from './pages/AccessoriesPage/AccessoriesPage';

const App = () => (
  <>
    <FavAndCartProvider>
      <Header />

      <main className="page__main">
        <Routes>
          <Route
            path="*"
            element={<h1 className="title title--not-found">Page not found</h1>}
          />

          <Route path="/" element={<HomePage />} />
          <Route path="/home" element={<Navigate to="/" replace />} />
          <Route path="phones">
            <Route index element={<PhonesPage />} />
            <Route path=":productId" element={<ProductDetailsPage />} />
          </Route>
          <Route path="tablets" element={<TabletsPage />} />
          <Route path="accessories" element={<AccessoriesPage />} />

          <Route path="favourites" element={<FavouritesPage />} />
          <Route path="cart" element={<CartPage />} />
        </Routes>
      </main>
    </FavAndCartProvider>

    <Footer />
  </>
);

export default App;
