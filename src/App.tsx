import { Routes, Route } from 'react-router-dom';
import './App.scss';
import { HomePage } from './Pages/HomePage';
import { PhonesPage } from './Pages/PhonesPage';
import { TabletsPage } from './Pages/TabletsPage';
import { AccessoriesPage } from './Pages/AccessoriesPage';
import { ProductDetailsPage } from './Pages/ProductDetailsPage';
import { FavouritesPage } from './Pages/FavouritesPage';
import { CartPage } from './Pages/CartPage';
import { NotFoundPage } from './Pages/NotFoundPage';
import { Footer } from './Components/Footer';
import { CartContextProvider } from './Components/Context/CartContextProvider';
import { FavContextProvider } from './Components/Context/FavContextProvider';
import { QueryContextProvider } from './Components/Context/QueryContext';

const App = () => {
  return (
    <QueryContextProvider>
      <CartContextProvider>
        <FavContextProvider>
          <div className="App">
            <div className="App__main">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/phones">
                  <Route index element={<PhonesPage />} />
                  <Route path=":productId" element={<ProductDetailsPage />} />
                </Route>
                <Route path="/tablets">
                  <Route index element={<TabletsPage />} />
                  <Route path=":productId" element={<ProductDetailsPage />} />
                </Route>
                <Route path="/accessories" element={<AccessoriesPage />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/favourites" element={<FavouritesPage />} />
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </div>
            <Footer />
          </div>
        </FavContextProvider>
      </CartContextProvider>
    </QueryContextProvider>
  );
};

export default App;
