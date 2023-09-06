import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import App from './App';
import {
  HomePage,
  PhonesPage,
  TabletsPage,
  AccessoriesPage,
  NotFound,
  ProductDetailsPage,
} from './pages';
import { Cart } from './pages/Cart';
import { Favourites } from './pages/Favourites';
import { ProductsProvider } from './context/productsContext';

export const pages = {
  home: <HomePage />,
  phones: <PhonesPage />,
  tablets: <TabletsPage />,
  accessories: <AccessoriesPage />,
  cart: <Cart />,
  favourites: <Favourites />,
  '*': <NotFound />,
};

export const Root = () => (
  <ProductsProvider>
    <Router>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<HomePage />} />

          <Route path="/phones">
            <Route index element={<PhonesPage />} />
            <Route path=":productId" element={<ProductDetailsPage />} />
          </Route>

          {Object.entries(pages).map(route => (
            <Route
              key={route[0]}
              path={route[0]}
              element={route[1]}
            />
          ))}
        </Route>
      </Routes>
    </Router>
  </ProductsProvider>

);
