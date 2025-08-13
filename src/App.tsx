import { Route, Routes } from 'react-router-dom';
import './App.scss';
import { HomePage } from './pages/HomePage';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { MobilePhonesPage } from './pages/MobilePhonesPage';
import { TabletsPage } from './pages/TabletsPage';

export const App = () => (
  <div className="App">
    <Header />
    <div className="App__content">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/phones" element={<MobilePhonesPage />} />
        <Route path="/tablets" element={<TabletsPage />} />
      </Routes>
    </div>
    <Footer />
  </div>
);
