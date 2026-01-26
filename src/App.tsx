import { Routes, Route, Navigate } from 'react-router-dom';
import './App.scss';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { PhonesPage } from './pages/PhonesPage';
import { TabletsPage } from './pages/TabletsPage';
import { AccessoriesPage } from './pages/AccessoriesPage';
import { ProductDetailsPage } from './pages/ProductDetailsPage';

export const App = () => (
  <div className="App">
    <Header />
    <main className="section">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/phones" element={<PhonesPage />} />
        <Route path="/tablets" element={<TabletsPage />} />
        <Route path="/accessories" element={<AccessoriesPage />} />
        <Route path="/product/:productId" element={<ProductDetailsPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </main>
    <Footer />
  </div>
);
