import {
  HashRouter as Router,
  Navigate,
  Route,
  Routes,
} from 'react-router-dom';

import { App } from '../App/App';
import { HomePage } from '../HomePage/HomePage';
import { PhonePage } from '../PhonePage';
import { FavotitePage } from '../FavotitePage';
import { CartPage } from '../CartPage';

export const Root = () => {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={<App />}
        >
          <Route
            index
            element={<HomePage />}
          />

          <Route
            path="/home"
            element={
              <Navigate
                to="/"
                replace
              />
            }
          />

          <Route
            path="/phones"
            element={<PhonePage />}
          />

          <Route
            path="/tablets"
            element={<HomePage />}
          />

          <Route
            path="/favorite"
            element={<FavotitePage />}
          />

          <Route
            path="/cart"
            element={<CartPage />}
          />

          {/* <Route path="/people/:slug?" element={<PeoplePage />} /> */}

          {/* <Route path="*" element={<PageNotFound />} /> */}
        </Route>
      </Routes>
    </Router>
  );
};
