import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import App from './App';
import { NotFound } from './pages/NotFound';
import { Home } from './pages/Home';
import { Phones } from './pages/Phones';
import { Tablets } from './pages/Tablets';
import { Accessories } from './pages/Accessories';
import { Favourites } from './pages/Favourites';
import { Cart } from './pages/Cart';
import { AppContextProvider } from './Contexts/AppContext';

ReactDOM.render(
  <AppContextProvider>
    <Router>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Home />} />
          <Route path="phones" element={<Phones />} />
          <Route path="tablets" element={<Tablets />} />
          <Route path="accessories" element={<Accessories />} />
          <Route path="favourites" element={<Favourites />} />
          <Route path="cart" element={<Cart />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Router>
  </AppContextProvider>,
  document.getElementById('root'),
);
