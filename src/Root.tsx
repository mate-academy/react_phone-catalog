import {
  HashRouter, Routes, Route, Navigate,
} from 'react-router-dom';

import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';
import { HomePage } from './pages/HomePage';
import { App } from './App';
import { Category } from './pages/Category';
import { ItemCard } from './pages/ItemCard';
import { Bag } from './pages/bag';

export const Root = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/home" element={<Navigate to="/" replace />} />
        <Route path="/" element={<App />}>
          <Route index element={<HomePage />} />

          <Route path=":category">
            <Route index element={(<Category />)} />
            <Route path="bag">
              <Route index element={(<Bag />)} />
            </Route>

            <Route path=":productId">
              <Route index element={(<ItemCard />)} />
              <Route path="bag">
                <Route index element={(<Bag />)} />
              </Route>
            </Route>
          </Route>

          <Route path="bag">
            <Route index element={(<Bag />)} />
          </Route>

          <Route
            path="*"
            element={<h1 className="title">Page not found</h1>}
          />
        </Route>
      </Routes>
    </HashRouter>
  );
};
