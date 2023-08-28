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

const App = () => {
  const { setQuery } = useContext(Context);
  const { pathname } = useLocation();
  const history = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [filterType, setFilterType] = useState('');
  const page = searchParams.get('page' || '');
  const perPage = searchParams.get('perPage' || '');
  const sort = searchParams.get('sort' || '');
  const filterQuery = searchParams.get('query' || '');
  const activeProduct = JSON.parse(
    localStorage.getItem('product') as string,
  ) || null;
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
        updateSearch={updateSearch}
      />

      <main style={{ flexGrow: 1 }}>
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
            path="/phones"
            element={(
              <>
                <Navigation
                  pathname={pathname}
                />
                <Products
                  productType={ProductTypes.phones}
                  pathname={pathname}
                  type="phone"
                  updateSearch={updateSearch}
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
                <Navigation
                  pathname={pathname}
                />
                <ProductDetails pathname={pathname} />
              </>
            )}
          />

          <Route
            path="/tablets"
            element={(
              <>
                <Navigation
                  pathname={pathname}
                />
                <Products
                  productType={ProductTypes.tablets}
                  pathname={pathname}
                  type="tablet"
                  updateSearch={updateSearch}
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
                <Navigation
                  pathname={pathname}
                />
                <ProductDetails pathname={pathname} />
              </>
            )}
          />

          <Route
            path="/accessories"
            element={(
              <>
                <Navigation
                  pathname={pathname}
                />
                <Products
                  productType={ProductTypes.accessories}
                  pathname={pathname}
                  type="accessory"
                  updateSearch={updateSearch}
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
                <Navigation
                  pathname={pathname}
                />
                <ProductDetails pathname={pathname} />
              </>
            )}
          />

          <Route
            path="/favourites"
            element={(
              <>
                <Navigation
                  pathname={pathname}
                />
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
