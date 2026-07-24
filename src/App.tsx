import { Navigate, Route, Routes } from 'react-router-dom';
import { Header } from './components/Header/Header';
import { HomePage } from './modules/HomePage/HomePage';
import { PhonesPage } from './modules/PhonesPage/PhonesPage';
import { Footer } from './components/Footer/Footer';
import notFound from '../public/img/page-not-found.png';
import style from './App.module.scss';
import { Container } from './components/Container/Container';
import { TabletsPage } from './modules/TabletsPage/TabletsPage';
import { AccessoriesPage } from './modules/AccessoriesPage/AccessoriesPage';
import { FavoritesPage } from './modules/FavoritesPage/FavoritesPage';
import { CartPage } from './modules/CartPage/CartPage';
import { DetailsPage } from './modules/DetailsPage/DetailsPage';
import products from '../public/api/products.json';

export const App = () => (
  <div className={style.App}>
    <Header />
    <div className={style.main}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="*"
          element={
            <Container>
              <img
                src={notFound}
                alt="PageNotFound"
                className={style.not_found}
              />
            </Container>
          }
        />
        <Route path="/home" element={<Navigate to="/" replace />} />
        <Route path="/phones" element={<PhonesPage />} />
        <Route path="/phones/:slug" element={<DetailsPage list={products} />} />
        <Route path="/tablets" element={<TabletsPage />} />
        <Route
          path="/tablets/:slug"
          element={<DetailsPage list={products} />}
        />
        <Route path="/accessories" element={<AccessoriesPage />} />
        <Route
          path="/accessories/:slug"
          element={<DetailsPage list={products} />}
        />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/favorites" element={<FavoritesPage />} />
      </Routes>
    </div>
    <Footer />
  </div>
);
