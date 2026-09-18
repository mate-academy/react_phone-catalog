import { Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';
import './App.scss';
import { HomePage } from './pages/HomePage';
import { NotFoundPage } from './pages/NotFoundPage';
import { Footer } from './components/Footer';

export const App = () => (
  <div className="App">
    <h1>Product Catalog H1</h1>
    <Header />
    <main>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </main>
    <Footer />
  </div>
);
