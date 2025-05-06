import './App.scss';
import { Navigate, Route, Routes } from 'react-router-dom';
import React from 'react';
import { Home } from './components/Home/Home';
import { Navbar } from './components/Navbar/Navbar';
import { Footer } from './components/Footer/Footer';
import { NotFoundPage } from './components/NotFoundPage/NotFoundPage';
import { Cart } from './components/Cart/Cart';
import { Favorites } from './components/Favorites/Favorites';
import { Phones } from './components/Phones/Phones';
import { Tablets } from './components/Tablets/Tablets';
import { Accessories } from './components/Accessories/Accessories';
import { ItemPage } from './components/ItemPage/ItemPage';
import { SearchResults } from './components/SearchResults/SearchResults';

export const App: React.FC = () => (
  <div data-cy="app">
    <Navbar />

    <main className="section">
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/phones">
            <Route index element={<Phones />} />
            <Route
              path=":slug"
              element={<ItemPage />}
            />
          </Route>
          <Route path="/tablets">
            <Route index element={<Tablets />} />
            <Route
              path=":slug"
              element={<ItemPage />}
            />
          </Route>
          <Route path="/accessories">
            <Route index element={<Accessories />} />
            <Route
              path=":slug"
              element={<ItemPage />}
            />
          </Route>
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/home" element={<Navigate to="/" replace />} />
          <Route path="/search*" element={<SearchResults />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </main>
    <Footer />
  </div>
);
