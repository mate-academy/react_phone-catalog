import { Routes, Route } from 'react-router-dom';
import { HomePage } from './Pages/HomePage/HomePage';
import { NotFoundPage } from './Pages/NotFoundPage/NotFoundPage';
import { Header } from './components/Header/Header';
import { Footer } from './components/Footer/Footer';
import './styles/global.scss';

export const App = () => {
  return (
    <div className="page">
      <Header />

      <main className="main">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
};
