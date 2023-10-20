import {
  Navigate,
  Route,
  Routes,
} from 'react-router-dom';
import { Header } from './Header';
import { Navigation } from './Navigation';
import { Home } from './Home';
import { Products } from './Products';
import { ProductDetails } from './ProductDetails';
import { Favourites } from './Favourites';
import { Cart } from './Cart';
import { Footer } from './Footer';
import { ProductTypes } from './types/productTypes';
import { LocaleStorageTypes } from './types/LocaleStorageTypes';

const App = () => {
  const activeProduct = JSON.parse(
    localStorage.getItem(LocaleStorageTypes.product) as string,
  ) || null;

  return (
    <div className="app">
      <Header />

      <main style={{ flexGrow: 1 }}>
        <Routes>
          <Route
            path="/"
            element={(
              <Home />
            )}
          />

          <Route
            path="/home"
            element={<Navigate to="/" replace />}
          />

          <Route
            path="/phones"
            element={(
              <>
                <Navigation />
                <Products
                  productType={ProductTypes.phones}
                  type="phone"
                />
              </>
            )}
          />

          <Route
            path={`/phones/:${activeProduct?.id}`}
            element={(
              <>
                <Navigation />
                <ProductDetails />
              </>
            )}
          />

          <Route
            path="/tablets"
            element={(
              <>
                <Navigation />
                <Products
                  productType={ProductTypes.tablets}
                  type="tablet"
                />
              </>
            )}
          />

          <Route
            path={`/tablets/:${activeProduct?.id}`}
            element={(
              <>
                <Navigation />
                <ProductDetails />
              </>
            )}
          />

          <Route
            path="/accessories"
            element={(
              <>
                <Navigation />
                <Products
                  productType={ProductTypes.accessories}
                  type="accessory"
                />
              </>
            )}
          />

          <Route
            path={`/accessories/:${activeProduct?.id}`}
            element={(
              <>
                <Navigation />
                <ProductDetails />
              </>
            )}
          />

          <Route
            path="/favourites"
            element={(
              <>
                <Navigation />
                <Favourites />
              </>
            )}
          />

          <Route
            path="/cart"
            element={(
              <>
                <Cart />
              </>
            )}
          />

          <Route
            path="/*"
            element={<p>Page not found</p>}
          />
        </Routes>
      </main>

      <Footer />
    </div>
  );
};

export default App;
