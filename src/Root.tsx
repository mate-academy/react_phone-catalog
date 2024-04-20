import {
  HashRouter as Router,
  // Navigate,
  Route,
  Routes,
} from 'react-router-dom';
import { App } from './App';
import { HomePage } from './Components/HomePage/HomePage';
import { Phone } from './Components/Phones/Phone';
import { Tables } from './Components/Tablets/Tables';
import { Accessories } from './Components/Accessories/Accessories';
import { Cart } from './Components/Cart/Cart';
import { Favorites } from './Components/Favorites/Favorites';

export const Root = () => (
  <Router>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<HomePage />} />
        <Route path="phone" element={<Phone />} />
        <Route path="tables" element={<Tables />} />
        <Route path="smart" element={<Accessories />} />
        <Route path="favorites" element={<Favorites />} />
        <Route path="cart" element={<Cart />} />
      </Route>
    </Routes>
  </Router>
);
