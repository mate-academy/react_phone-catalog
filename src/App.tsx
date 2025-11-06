import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { HomePage } from './modules/HomePage';
import { PhonesPage } from './modules/PhonesPage';
import { Header } from './modules/shared/components/Header';
import { Footer } from './modules/shared/components/Footer';

import './styles/main.scss';

export const App = () => (
  <div className="app-wrapper">
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/phones" element={<PhonesPage />} />
      </Routes>

      <Footer />
    </Router>
  </div>
);
