import {
  Navigate,
  Route,
  HashRouter as Router,
  Routes,
} from 'react-router-dom';
import { App } from './App';
import { HomePage } from './modules/HomePage/HomePage';
import { Phones } from './modules/Phones/Phones';
import { Tablets } from './modules/Tablets/Tablets';
import { Accessories } from './modules/Accessories/Accessories';

export const Root = () => (
  <Router>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<HomePage />} />
        <Route path="home" element={<Navigate to=".." />} />
        <Route path="phones" element={<Phones />} />
        <Route path="tablets" element={<Tablets />} />
        <Route path="accessories" element={<Accessories />} />
        <Route path="favourites" element={<HomePage />} />
        <Route path="cart" element={<HomePage />} />
      </Route>
    </Routes>
  </Router>
);
