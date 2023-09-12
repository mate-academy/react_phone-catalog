import { Route, Routes } from 'react-router-dom';
import './App.scss';
import { Footer } from './components/Footer/Footer';
import { Header } from './components/Header/Header';
import { HomePage } from './pages/HomePage';
import { PhonesPage } from './pages/PhonesPage';
import { ProductDetailsPage } from './pages/ProductDetailsPage';
import { FavouritesPage } from './pages/FavouritesPage';
import { CartPage } from './pages/CartPage';
import { TabletsPage } from './pages/TabletsPage';
import { AccessoriesPage } from './pages/AccessoriesPage';
import { PhoneNotFoundPage } from './pages/PhoneNotFoundPage';

const App = () => (
  <div className="App">
    <Header />

    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/phones">
        <Route index element={<PhonesPage />} />
        <Route path=":productId" element={<ProductDetailsPage />} />
        <Route path="not-found" element={<PhoneNotFoundPage />} />
      </Route>
      <Route path="/tablets" element={<TabletsPage />} />
      <Route path="/accessories" element={<AccessoriesPage />} />
      <Route path="/favourites" element={<FavouritesPage />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="*" element={<CartPage />} />
    </Routes>

    <Footer />
  </div>
);

export default App;
