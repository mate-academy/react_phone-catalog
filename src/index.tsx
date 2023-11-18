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
import { Cart } from './pages/Cart';
import { AppContextProvider } from './Contexts/AppContext';
import { ItemCard } from './pages/ItemCard';
import { Favourites } from './pages/Favourites';

ReactDOM.render(
  <AppContextProvider>
    <Router>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Home />} />
          <Route path="catalogue/:catalogueId" element={<Catalogue />}>
            <Route path=":itemId" element={<ItemCard />} />
          </Route>
          <Route path="favourites" element={<Favourites />} />
          <Route path="cart" element={<Cart />} />
          <Route path="home" element={<Navigate to="/" />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Router>
  </AppContextProvider>,
  document.getElementById('root'),
);
