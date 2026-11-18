import { Route, Routes } from 'react-router-dom';
import './App.scss';
import { Footer } from './components/Footer/Footer';
import { Header } from './components/Header/Header';
import { Home } from './components/HomePage/Home';
import { Grid } from './components/PageGrid/Grid';
import { ProductsPage } from './components/ProductsPage/ProductsPage';
import { Favourites } from './components/FavouritesPage/Favourites';
import { CartPage } from './components/CartPage/CartPage';
import { ProductDetail } from './components/ProductDetail/ProductDetail';
import { PageNotFound } from './components/PageNotFound/PageNotFound';
import { RightsPage } from './components/RightsPage/RightsPage';

export const App = () => {
  return (
    <div className="App">
      <Header />

      <Grid>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/phones"
            element={<ProductsPage category={'phones'} />}
          />
          <Route
            path="/tablets"
            element={<ProductsPage category={'tablets'} />}
          />
          <Route
            path="/accessories"
            element={<ProductsPage category={'accessories'} />}
          />
          <Route path="/favourites" element={<Favourites />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/:category/:productId" element={<ProductDetail />} />
          <Route path="/rights" element={<RightsPage />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Grid>

      <Footer />
    </div>
  );
};
