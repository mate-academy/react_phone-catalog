import './App.scss';
import { Header } from './components/Header/header';
import { HomePage } from './pages/HomePages';
import { Footer } from './components/footer/footer';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { CatalogPage } from './pages/CatalogPage';
import { ProductPage } from './pages/ProductPage';

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
