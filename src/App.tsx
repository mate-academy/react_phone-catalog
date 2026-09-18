import { Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { NotFoundPage } from './pages/NotFoundPage';
import './App.scss';

export const App = () => (
  <div className="app">
    <Header />
    <main className="app__main section">
      <div className="container">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </main>
    <Footer />
  </div>
);
