import { Route, Routes } from 'react-router-dom';
import './App.scss';
import { HomePage } from './pages/HomePage';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { MobilePhonesPage } from './pages/MobilePhonesPage';

export const App = () => (
  <div className="App">
    <Header />
    <div className="App__content">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/phones" element={<MobilePhonesPage />} />
      </Routes>
    </div>
    <Footer />
  </div>
);
