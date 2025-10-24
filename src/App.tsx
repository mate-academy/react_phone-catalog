import './App.scss';
import { Header } from './modules/Shared/Header/Header';
import { HomePage } from './modules/HomePage/HomePages';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { CatalogPage } from './modules/CatalogPage/CatalogPage';
import { ProductPage } from './modules/ProductPage/ProductPage';
import { Footer } from './modules/Shared/Footer/Footer';

export const App = () => (
  <Router>
    <div className="App">
      <Header />
      <div className="container">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/phones" element={<CatalogPage />} />
          <Route path="/tablets" element={<CatalogPage />} />
          <Route path="/accessories" element={<CatalogPage />} />
          <Route path="/phones/:productId" element={<ProductPage />} />
          <Route path="/tablets/:productId" element={<ProductPage />} />
          <Route path="/accessories/:productId" element={<ProductPage />} />
        </Routes>
        <Footer />
      </div>
    </div>
  </Router>
);
