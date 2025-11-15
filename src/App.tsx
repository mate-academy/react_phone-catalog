import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Header } from './shared/components/Header';
import { Footer } from './shared/components/Footer';
import { HomePage } from './modules/HomePage/HomePage';
import { PhonesPage } from './modules/PhonesPage/PhonesPage';
import { NotFoundPage } from './modules/NotFoundPage/NotFoundPage';
import './styles/fonts.scss';
import './App.scss';

export const App = () => (
  <BrowserRouter>
    <div className="app-wrapper">
      <Header />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/phones" element={<PhonesPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  </BrowserRouter>
);
