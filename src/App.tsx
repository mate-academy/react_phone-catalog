import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { HomePage } from './modules/HomePage';
import { CategoryPage } from './modules/CategoryPage';
import { Header } from './modules/Header';
import { Footer } from './modules/Footer';
import { ProductDetailsPage } from './modules/ProductDetailsPage';
import { NotFoundPage } from './modules/NotFoundPage';

import './styles/main.scss';

export const App = () => (
  <div className="app-wrapper">
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/phones" element={<CategoryPage category="phones" />} />
        <Route path="/tablets" element={<CategoryPage category="tablets" />} />
        <Route
          path="/accessories"
          element={<CategoryPage category="accessories" />}
        />
        <Route path="/product/:productId" element={<ProductDetailsPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>

      <Footer />
    </Router>
  </div>
);
