import {
  Navigate,
  Route,
  Routes,
} from 'react-router-dom';
import { Header } from './Header';
import { Home } from './Home';
import { Products } from './Products';
import { ProductDetails } from './ProductDetails';
import { Favourites } from './Favourites';
import { Cart } from './Cart';
import { Footer } from './Footer';
import { ProductTypes } from './types/productTypes';
import { NoResults } from './NoResults';

const App = () => {
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
          >
            <Route
              index
              element={(
                <>
                  <Products
                    productType={ProductTypes.phones}
                    type="phone"
                  />
                </>
              )}
            />
            <Route
              path=":activeProductId"
              element={(
                <>
                  <ProductDetails />
                </>
              )}
            />
          </Route>

          <Route
            path="/tablets"
          >
            <Route
              index
              element={(
                <>
                  <Products
                    productType={ProductTypes.tablets}
                    type="tablet"
                  />
                </>
              )}
            />
            <Route
              path=":activeProductId"
              element={(
                <>
                  <ProductDetails />
                </>
              )}
            />
          </Route>

          <Route
            path="/accessories"
          >
            <Route
              index
              element={(
                <>
                  <Products
                    productType={ProductTypes.accessories}
                    type="accessory"
                  />
                </>
              )}
            />
            <Route
              path=":activeProductId"
              element={(
                <>
                  <ProductDetails />
                </>
              )}
            />
          </Route>

          <Route
            path="/favourites"
            element={(
              <>
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
            element={<NoResults productType="Page" />}
          />
        </Routes>
      </main>

      <Footer />
    </div>
  );
};

export default App;
