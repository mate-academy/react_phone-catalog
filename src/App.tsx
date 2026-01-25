import { Routes, Route, Navigate } from 'react-router-dom';
import './App.scss';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { PhonesPage } from './pages/PhonesPage';

export const App = () => (
  <div className="App">
    <Header />
    <main className="section">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/phones" element={<PhonesPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </main>
    <Footer />
  </div>
);
