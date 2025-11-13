import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { HomePage } from './modules/HomePage';
import { PhonesPage } from './modules/PhonesPage';
import { Header } from './modules/Header';
import { Footer } from './modules/Footer';

import './styles/main.scss';

export const App = () => (
  <Router>
    <Header />
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/phones" element={<PhonesPage />} />
    </Routes>

    <Footer />
  </Router>
);
