import {
  Navigate,
  Route,
  HashRouter as Router, // BrowserRouter или HashRouter - если нужно github pages
  Routes,
} from 'react-router-dom';
import App from './App';
import PageNotFound from './components/PageNotFound/PageNotFound';
import Cart from './pages/Cart';
import Accessories from './pages/Extra/Accessories';
import Favourites from './pages/Extra/Favourites';
import ProductDetails from './pages/Extra/ProductDetails/ProductDetails';
import Home from './pages/Home';
import Phones from './pages/Phones';
import Tablets from './pages/Tablets';

export const Root = () => (
  <Router>
    <Routes>
      <Route path="/" element={<App />}>
        {/* Главная страница */}
        <Route index element={<Home />} />
        {/* Редирект со /home на корень */}
        <Route path="/home" element={<Navigate to="/" />} />
        {/* Маршруты для страниц */}
        <Route path="/phones" element={<Phones />} />
        <Route path="/tablets" element={<Tablets />} />
        <Route path="/accessories" element={<Accessories />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/favorites" element={<Favourites />} />
        <Route path="/:category/:itemId" element={<ProductDetails />} />

        {/* Если ни один маршрут не совпал */}
        <Route path="*" element={<PageNotFound />} />
      </Route>
    </Routes>
  </Router>
);
