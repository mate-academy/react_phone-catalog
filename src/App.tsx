import { useMemo, useState, useContext } from 'react';
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

const App = () => {
  const { activeProduct, setQuery } = useContext(Context);
  const { pathname } = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const [filterType, setFilterType] = useState('');
  const page = searchParams.get('page' || '');
  const perPage = searchParams.get('perPage' || '');
  const sort = searchParams.get('sort' || '');
  const filterQuery = searchParams.get('query' || '');
  const updateSearch = (params: {
    [key: string]: number[] | string[] | string | null
  }) => {
    Object.entries(params).forEach(([key, value]) => {
      if (value === null) {
        searchParams.delete(key);
      } else if (Array.isArray(value)) {
        searchParams.delete(key);

        value.forEach(part => {
          searchParams.append(key, String(part));
        });
      } else {
        searchParams.set(key, value);
      }

      setSearchParams(searchParams);
    });
  };

  useMemo(() => {
    if (pathname === '/phones') {
      setFilterType('phones');
    } else if (pathname === '/favourites') {
      setFilterType('favourites');
    } else {
      setFilterType('');
    }

    setQuery('');
    updateSearch({ query: null });
  }, [pathname]);

  return (
    <div className="app">
      <Header
        filterType={filterType}
        filterQuery={filterQuery}
        updateSearch={updateSearch}
      />

      <Routes>
        <Route
          path="/"
          element={(
            <Home pathname={pathname} />
          )}
        />

        <Route
          path="/home"
          element={<Navigate to="/" replace />}
        />

        <Route
          path={`/${activeProduct?.id}`}
          element={<Navigate to={`/${activeProduct?.type}s/${activeProduct?.id}`} replace />}
        />

        <Route
          path="/phones"
          element={(
            <main style={{ flexGrow: 1 }}>
              <Navigation
                pathname={pathname}
              />
              <Products
                productType="Mobile Phones"
                pathname={pathname}
                type="phone"
                updateSearch={updateSearch}
                page={page}
                sort={sort}
                perPage={perPage}
              />
            </main>
          )}
        />

        <Route
          path={`/phones/:${activeProduct?.id}`}
          element={(
            <main style={{ flexGrow: 1 }}>
              <Navigation
                pathname={pathname}
              />
              <ProductDetails pathname={pathname} />
            </main>
          )}
        />

        <Route
          path="/tablets"
          element={(
            <main style={{ flexGrow: 1 }}>
              <Navigation
                pathname={pathname}
              />
              <Products
                productType="Tablets"
                pathname={pathname}
                type="tablet"
                updateSearch={updateSearch}
                page={page}
                sort={sort}
                perPage={perPage}
              />
            </main>
          )}
        />

        <Route
          path="/accessories"
          element={(
            <main style={{ flexGrow: '1' }}>
              <Navigation
                pathname={pathname}
              />
            </main>
          )}
        />

        <Route
          path="/favourites"
          element={(
            <main style={{ flexGrow: '1' }}>
              <Navigation
                pathname={pathname}
              />
              <Favourites />
            </main>
          )}
        />

        <Route
          path="/cart"
          element={(
            <main style={{ flexGrow: '1' }}>
              <Cart />
            </main>
          )}
        />

        <Route
          path="/*"
          element={<p>Page not found</p>}
        />
      </Routes>

      <Footer />
    </div>
  );
};

export default App;
