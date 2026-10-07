import { Route, Routes } from 'react-router-dom';

import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { HomePage } from './modules/HomePage';
import { NotFoundPage } from './modules/NotFoundPage';

import './App.scss';

const PlaceholderPage = ({ title }: { title: string }) => {
  return (
    <main className="placeholderPage">
      <h1>{title}</h1>
    </main>
  );
};

export const App = () => {
  return (
    <div className="App">
      <Header />

      <div className="App__content">
        <Routes>
          <Route path="/" element={<HomePage />} />

          <Route
            path="/phones"
            element={<PlaceholderPage title="Phones page" />}
          />

          <Route
            path="/tablets"
            element={<PlaceholderPage title="Tablets page" />}
          />

          <Route
            path="/accessories"
            element={<PlaceholderPage title="Accessories page" />}
          />

          <Route
            path="/favorites"
            element={<PlaceholderPage title="Favorites" />}
          />

          <Route path="/cart" element={<PlaceholderPage title="Cart" />} />

          <Route
            path="/product/:productId"
            element={<PlaceholderPage title="Product details" />}
          />

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>

      <Footer />
    </div>
  );
};
