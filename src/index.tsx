import ReactDOM from 'react-dom';
import {
  HashRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import App from './App';
import { NotFound } from './pages/NotFound';
import { Home } from './pages/Home';
import { Catalogue } from './pages/Catalogue';
import { Cart } from './pages/CartPage';
import { AppContextProvider } from './Contexts/AppContext';
import { ItemPage } from './pages/ItemPage';
import { Favourites } from './pages/Favourites';

import './output.css';

ReactDOM.render(
  <Router>
    <AppContextProvider>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Home />} />
          <Route path="catalogue/:catalogueId" element={<Catalogue />}>
            <Route path=":itemId" element={<ItemPage />} />
          </Route>
          <Route path="favourites" element={<Favourites />} />
          <Route path="cart" element={<Cart />} />
          <Route path="home" element={<Navigate to="/" />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </AppContextProvider>
  </Router>,
  document.getElementById('root'),
);
