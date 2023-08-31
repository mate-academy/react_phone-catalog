import { useMemo, useState, useContext } from 'react';
import { useNavigate } from 'react-router';
import {
  Navigate,
  Route,
  Routes,
  useLocation,
  useSearchParams,
} from 'react-router-dom';
import { Context } from './Context';
import { Header } from './Header';
import { Navigation } from './Navigation';
import { Home } from './Home';
import { Products } from './Products';
import { ProductDetails } from './ProductDetails';
import { Favourites } from './Favourites';
import { Cart } from './Cart';
import { Footer } from './Footer';
import { ProductTypes } from './types/productTypes';
import { SearchTypes } from './types/SearchTypes';
import { LocaleStorageTypes } from './types/LocaleStorageTypes';
import { useUpdateSearch } from './utils/hooks';

const App = () => {
  const { setQuery } = useContext(Context);
  const { pathname } = useLocation();
  const history = useNavigate();
  const [searchParams] = useSearchParams();
  const [filterType, setFilterType] = useState('');
  const page = searchParams.get(SearchTypes.page) || '';
  const perPage = searchParams.get(SearchTypes.perPage) || '';
  const sort = searchParams.get(SearchTypes.sort) || '';
  const filterQuery = searchParams.get(SearchTypes.query) || '';
  const activeProduct = JSON.parse(
    localStorage.getItem(LocaleStorageTypes.product) as string,
  ) || null;
  const updateSearch = useUpdateSearch();

  useMemo(() => {
    if (pathname === '/phones') {
      setFilterType('phones');
    } else if (pathname === '/tablets') {
      setFilterType('tablets');
    } else if (pathname === '/accessories') {
      setFilterType('accessories');
    } else if (pathname === '/favourites') {
      setFilterType('favourites');
    } else {
      setFilterType('');
    }

    setQuery('');
    updateSearch({ query: null });
    history(-1);
  }, [pathname]);

  return (
    <div className="app">
      <Header
        filterType={filterType}
        filterQuery={filterQuery}
      />

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
                  page={page}
                  sort={sort}
                  perPage={perPage}
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
                  page={page}
                  sort={sort}
                  perPage={perPage}
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
                  page={page}
                  sort={sort}
                  perPage={perPage}
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
