import {
  Navigate,
  Route,
  HashRouter as Router,
  Routes,
} from 'react-router-dom';
import { App } from './App';
import { HomePage } from './Pages/HomePage';
import { CartPage } from './Pages/CartPage';
import { ProductsPage } from './Pages/ProductsPage';
import { FavoritesPage } from './Pages/FavoritesPage';
import { ProductInfoPage } from './Pages/ProductInfoPage';
import { RussiaTrash } from './Pages/RussiaTrash';
import { MakeYourChoice } from './Pages/MakeYourChoice/MakeYourChoice';
import { NotFoundPage } from './Pages/NotFoundPage';
import { HelpDefenders } from './Pages/HelpDefenders';
import { Contacts } from './Pages/Contacts';

export const Root = () => (
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
          path="home"
          element={
            <Navigate
              to="/"
              replace
            />
          }
        />
        <Route
          path=":category"
          element={<ProductsPage />}
        >
          <Route
            path=":itemId?"
            element={<ProductInfoPage />}
          />
        </Route>
        <Route
          path="favorites"
          element={<FavoritesPage />}
        />
        <Route
          path="cart"
          element={<CartPage />}
        ></Route>
        <Route
          path="contacts"
          element={<Contacts />}
        ></Route>
        <Route
          path="help-defenders"
          element={<HelpDefenders />}
        />
        <Route
          path="russians-are-not-people"
          element={<RussiaTrash />}
        />
        <Route
          path="make-your-choice"
          element={<MakeYourChoice />}
        >
          <Route
            path="help-defenders"
            element={<HelpDefenders />}
          />
        </Route>

        <Route
          path="*"
          element={<NotFoundPage />}
        />
      </Route>
    </Routes>
  </Router>
);
