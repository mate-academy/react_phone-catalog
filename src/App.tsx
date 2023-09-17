import { FC } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { SearchContextProvider } from './context/searchContext';
import { CartProvider } from './context/cartContext';
import './App.scss';
import { Header } from './components/Header/Header';
import { HomePage } from './pages/home/HomePage';
import { Footer } from './components/Footer/Footer';
import { PhonesPage } from './pages/phones/PhonesPage';
import { TabletsPage } from './pages/tablets/TabletsPage';
import { AccessoriesPage } from './pages/accessories/AccessoriesPage';
import { CartPage } from './pages/cart/CartPage';
import { ProductDetails } from './pages/productdetails/ProductDetails';
import { FavouritesPage } from './pages/favourites/FavouritesPage';
import FavouritesProvider from './context/favouritesContext';
import { NoResults } from './components/NoResults/NoResults';

const App: FC = () => (
  <CartProvider>
    <FavouritesProvider>
      <SearchContextProvider>
        <div className="App">
          <Header />

          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route
              path="home"
              element={
                <Navigate to="/" replace />
              }
            />

            <Route
              path="*"
              element={<NoResults title="Page" />}
            />

            <Route
              path="phones"
              element={<PhonesPage />}
            />

            <Route
              path="tablets"
              element={<TabletsPage />}
            />

            <Route
              path="accessories"
              element={<AccessoriesPage />}
            />

            <Route
              path="favorites"
              element={<FavouritesPage />}
            />

            <Route
              path="cart"
              element={<CartPage />}
            />

            <Route
              path=":itemId"
              element={<ProductDetails />}
            />
          </Routes>

          <Footer />
        </div>
      </SearchContextProvider>
    </FavouritesProvider>
  </CartProvider>
);

export default App;
