import {
  HashRouter as Router,
  // Navigate,
  Route,
  Routes,
} from 'react-router-dom';
import { App } from './App';
import { HomePage } from './Components/HomePage';
import { Phones } from './Components/Phones';
import { Tables } from './Components/Tablets';
import { Accessories } from './Components/Accessories';
import { Cart } from './Components/Cart';
import { Favorites } from './Components/Favorites';
import { InfoCard } from './Components/InfoCard';
import { NotFoundPage } from './Components/NotFoundPage';

export const Root = () => (
  <Router>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<HomePage />} />
        <Route path="phones" element={<Phones />}>
          <Route path="phone/:itemId?" />
        </Route>
        <Route path="tables" element={<Tables />} />
        <Route path="smart" element={<Accessories />} />
        <Route path="favorites" element={<Favorites />} />
        <Route path="cart" element={<Cart />} />
        <Route path="info/:category/:itemId?" element={<InfoCard />} />

        <Route path="*" element={<NotFoundPage />}></Route>
      </Route>
    </Routes>
  </Router>
);
